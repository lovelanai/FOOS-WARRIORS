import ICON from "@/assets/icons/icons";
import { Header } from "@/components/header/Header";
import { InputField } from "@/components/input-field/InputField";
import { GamesImInCard, MyGameCard } from "@/components/my-games/MyGameCard";
import { PlayerCardSkeleton } from "@/views/find-players/skeleton/PlayerCardSkeleton";
import { PlayerCard } from "@/components/player-card/PlayerCard";
import { useUser } from "@/context/UserContext";
import { db } from "@/firebase/firebase.config";
import { sendNotification, useFetch } from "@/utils/hooks";
import { GameProps, UserProps } from "@/utils/props";
import { uuidv4 } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyGames.sass";

export const MyGames = () => {
  const navigate = useNavigate();
  const {
    loggedInUserId,
    users,
    isLoading,
    isInviteView,
    setIsInviteView,
    finished,
    setFinished,
    active,
    setActive,
    setInvitedPlayerId,
  } = useUser();

  const user: UserProps = users.find(({ id }) => id === loggedInUserId)!;

  const { response: gameResponse } = useFetch("games", loggedInUserId);
  const gameData = { ...(gameResponse as unknown as GameProps) };
  const gameDataArray = gameResponse as unknown as GameProps;

  const [newGameMode, setNewGameMode] = useState(false);
  const [gameName, setGameName] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [invitedPlayers, setInvitedPlayers] = useState([] as any);

  const handleInviteList = (
    name: string,
    id: string,
    token: string,
    img: string,
    wins: number | "",
    losses: number | ""
  ) => {
    sendNotification({
      to: token,
      title: "INCOMING BATTLE",
      body: `${user.name} invited you to play a game of foos!`,
      recieverId: id,
    }).then(() => {
      const uid = uuidv4();
      const ref = doc(db, `notifications/${uid}`);
      const day = new Date().toDateString();
      const time = new Date().toLocaleTimeString();
      setDoc(ref, {
        title: "INCOMING BATTLE",
        text: `${user.name} invited you to play a game of foos!`,
        id: uid,
        time: `${day} ${time}`,
      })
        .finally(() => {
          let newPlayer = { name, id, img, wins, losses };
          invitedPlayers.push(newPlayer);
          setInvitedPlayerId(id);
        })
        .catch((err) => {
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
      img: user.img,
      wins: user.wins,
      losses: user.losses,
    };
    invitedPlayers.push(host);
    setDoc(doc(db, `games/${loggedInUserId}`), {
      gameName: gameName,
      players: invitedPlayers,
    });
    setNewGameMode(false);
  };

  const searchFilter = (user: UserProps) =>
    inputValue === "" ||
    user.name.toLowerCase().includes(inputValue.toLowerCase());

  const removeLoggedInUser = (user: UserProps) => user.id !== loggedInUserId;

  const handleViews = (value: string) => {
    if (value === "active") {
      setActive(true);
      setFinished(false);
    } else if (value === "finished") {
      setFinished(true);
      setActive(false);
    }
  };

  return (
    <div className="my-games">
      {!newGameMode ? (
        <>
          <Header
            element={
              <div onClick={() => navigate(-1)}>
                <ICON.Arrow />
              </div>
            }
            title="My Games"
          />
          <div className="icon" onClick={() => setNewGameMode(true)}>
            <ICON.Add />
          </div>
          <div className="games-menu">
            <h3>Games I host</h3>
            <div className="links">
              <button
                className={`${active ? "-underline" : ""}`}
                onClick={() => handleViews("active")}
              >
                Active
              </button>
              <button
                className={`${finished ? "-underline" : ""}`}
                onClick={() => handleViews("finished")}
              >
                Finished
              </button>
            </div>
          </div>
          <div className="my-games-container">
            <MyGameCard
              playerData={gameDataArray.players}
              gameName={gameData.gameName}
            />
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="games-menu">
            <h3>Games I'm in</h3>
            {/*  <div className="links">
              <button className={`${active ? "-underline" : ""}`} onClick={ () => handleViews('active')}>Active</button>
              <button className={`${finished ? "-underline" : ""}`} onClick={ () => handleViews('finished')}>Finished</button>
            </div> */}
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
              <button className="continue" onClick={createGame}>
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
              {users && !isLoading ? (
                <>
                  {users
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
                            user.currentToken,
                            user.img,
                            user.wins,
                            user.losses
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
