import ICON from "@/assets/icons/icons";
import { Header } from "@/components/header/Header";
import { GamesImInCard, MyGameCard } from "@/components/my-games/MyGameCard";
import "./MyGames.sass";
import { mockedUser, mockedUsers } from "@/mockedUsers/mockedUsers";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { InputField } from "@/components/input-field/InputField";
import { InviteCard } from "@/components/InviteCard/InviteCard";
import { HeaderNotification } from "@/components/notification/HeaderNotification";
import { PlayerCardSkeleton } from "@/components/player-card/player-card-skeleton/PlayerCardSkeleton";
import { PlayerCard } from "@/components/player-card/PlayerCard";
import { UserContext, useUser } from "@/context/UserContext";
import { db } from "@/firebase/firebase.config";
import { fetchWithMatch, sendNotification, useFetch } from "@/utils/hooks";
import { UserProps, GameProps } from "@/utils/props";
import { uuidv4 } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { stripBasename } from "@remix-run/router";

export const MyGames = () => {
  const navigate = useNavigate();

  
  const { setIsInviteView, isInviteView, setInvitedPlayerId } = useContext(UserContext);
  const { loggedInUserId } = useUser();
  const { response, isLoading } = useFetch("users");
  const { response: currentUser } = useFetch("users", loggedInUserId);
  const user = { ...(currentUser as unknown as UserProps) };
  const { response: runningGames } = useFetch("games", loggedInUserId);
  const games = { ...(runningGames as unknown as GameProps) };

  
  const [newGameMode, setNewGameMode] = useState(false);
  const [gameName, setGameName] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [invitedPlayers, setInvitedPlayers] = useState([] as any);

  const handleInviteList = (name: string, id: string, token: string) => {
      sendNotification({
      to: token,
      title: "INCOMING BATTLE",
      body: `${user.name} invited you to play a game of foos!`,
      recieverId: id,
    }).then(() => {
      const id = uuidv4();
      const currentUserRef = doc(db, `notifications/${id}`);
      const day = new Date().toDateString();
      const time = new Date().toLocaleTimeString();
      setDoc(currentUserRef, {
        title: "INCOMING BATTLE",
        text: `${user.name} invited you to play a game of foos!`,
        id: id,
        time: `${day} ${time}`,
      }).finally(() => {
        let newPlayer = { name, id };
        invitedPlayers.push(newPlayer);
        setInvitedPlayerId(id);
      }).catch((err) => {
        console.log("error", err);
      });
    });
  };

  const removeFromInviteList = (player: {}) => {
    let updatedList = invitedPlayers.filter(
      (playerToRemove: any) => player != playerToRemove
    );
    setInvitedPlayers(updatedList);
  };

  const createGame = () => {
    const host = {
      name: user.name,
      id: user.id,
    };
    invitedPlayers.push(host);
    setDoc(doc(db, `games/${loggedInUserId}`), {
      gameName: gameName,
      players: invitedPlayers,
    });
    setNewGameMode(false)
  };

  const searchFilter = (user: UserProps) =>
    inputValue === "" ||
    user.name.toLowerCase().includes(inputValue.toLowerCase());

  const removeLoggedInUser = (user: UserProps) => user.id !== loggedInUserId;

  return (
    <div className="my-games">
      {!newGameMode ? (
        <>
          <Header element={<ICON.Arrow />} title="My Games" />
          <div className="icon" onClick={() => setNewGameMode(true)}>
            <ICON.Add />
          </div>
          <div className="games-menu">
            <h3>Games I host</h3>
            <div className="links">
              <p>Pending</p>
              <p>Active</p>
              <p>Finished</p>
            </div>
          </div>
          <div className="my-games-container">
             <MyGameCard
              data={runningGames.players}
              gameName={games.gameName}
            /> 
          </div>
          <div className="games-menu">
            <h3>Games I'm in</h3>
            <div className="links">
              <p>Pending</p>
              <p>Active</p>
              <p>Finished</p>
            </div>
          </div>
          <div className="my-games-container">
            <GamesImInCard />
          </div>
        </>
      ) : newGameMode && !isInviteView ? (
        <>
          <Header title="New game" />
          <div className="new-name-view">
            <h3>Create a new game </h3>
            <input
              placeholder="Type game name.."
              onChange={(e) => setGameName(e.target.value)}
            ></input>
            <div className="btn-group">
              <button
                className="continue"
                onClick={() => setIsInviteView(true)}
              >
                Continue
              </button>
              <button className="exit">Exit</button>
            </div>
          </div>
        </>
      ) : newGameMode && isInviteView ? (
        <>
          <Header title="New game" />
          <div className="invite-view">
            <h3>Invite players for {gameName} </h3>
            {invitedPlayers.length !== 3 ? (
              <InputField
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                type="search"
                placeholder="Search..."
              />
            ) : (
              <button
                className="continue"
                onClick={createGame /* () => setIsInviteView(true) */}
              >
                Continue
              </button>
            )}

            <h3 className="amount-invited">
              {invitedPlayers.length}/3 invited
            </h3>
            <div className="invited-players">
              {invitedPlayers.map((player: any, index: any) => {
                <div key={index}></div>;
                console.log(player);
                if (invitedPlayers.length > 0) {
                  return (
                    <div className="invite-list" key={index}>
                      <h3>{player.name}</h3>
                      <button onClick={() => removeFromInviteList(player)}>
                        Uninvite player
                      </button>
                    </div>
                  );
                }
              })}
            </div>
            <div className="content">
              {response && !isLoading ? (
                <>
                  {response
                    .filter(searchFilter)
                    .filter(removeLoggedInUser)
                    .map((user: UserProps) => (
                      <PlayerCard
                        title={user.name}
                        img={user.img}
                        key={user.id}
                        id={user.id}
                        inviteOnClick={() =>
                          handleInviteList(
                            user.name,
                            user.id,
                            user.currentToken
                          )
                        }
                      />
                    ))}
                </>
              ) : (
                <>
                  {Array(6)
                    .fill(null)
                    .map((key, index) => (
                      <PlayerCardSkeleton key={index} />
                    ))}
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
