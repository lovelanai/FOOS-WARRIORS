import ICON from "@/assets/icons/icons";
import { Header } from "@/components/header/Header";
import { GamesImInCard, MyGameCard } from "@/components/my-games/MyGameCard";
import "./MyGames.sass";
import { mockedUser, mockedUsers } from "@/mockedUsers/mockedUsers";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { PrimaryButton } from "@/components/primary-button/PrimaryButton";
import { FindPlayers, InvitePlayers } from "../find-players/FindPlayers";
import { InputField } from "@/components/input-field/InputField";
import { InviteCard } from "@/components/InviteCard/InviteCard";
import { HeaderNotification } from "@/components/notification/HeaderNotification";
import { PlayerCardSkeleton } from "@/components/player-card/player-card-skeleton/PlayerCardSkeleton";
import { PlayerCard } from "@/components/player-card/PlayerCard";
import { UserContext, useUser } from "@/context/UserContext";
import { db } from "@/firebase/firebase.config";
import { fetchWithMatch, sendNotification, useFetch } from "@/utils/hooks";
import { UserProps } from "@/utils/props";
import { uuidv4 } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { stripBasename } from "@remix-run/router";
//import "././FindPlayers.sass";

export const MyGames = () => {
  const [newGameMode, setNewGameMode] = useState(false);
  //const [inviteView, setInviteView] = useState(false)
  const [gameName, setGameName] = useState("");
  const { setIsInviteView, isInviteView, setInvitedPlayerId } = useContext(UserContext);

  const handleInput = (event: string) => {
    setGameName(event);
  };

  const navigate = useNavigate();
  const { loggedInUserId } = useUser();
  const { response, isLoading } = useFetch("users");
  const { response: currentUser } = useFetch("users", "Love Lanai");
  const user = { ...(currentUser as unknown as UserProps) };

  const [invitationMode, setInvitationMode] = useState(false);
  const [name, setName] = useState("");
  const [notificatonToken, setNotificationToken] = useState("");
  const [recieverId, setRecieverId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [invitedPlayers, setInvitedPlayers] = useState([''])

  const handleInvitation = (name: string, token: string, id: string) => {
    /* setInvitationMode(true); */
     
      setInvitedPlayerId(id)
      //setInvitedPlayers([name])
      /*setNotificationToken(token);
      setRecieverId(id); */
      
      console.log(name, token, id);
    };
    
    const handleInviteList = (name: string, id: string) => {
    setInvitedPlayerId(id)
        setName(name)
      invitedPlayers.push(name)
}

 


  console.log(invitedPlayers, name)

  const handleSendInvite = () => {
    sendNotification({
      to: notificatonToken,
      title: "INCOMING BATTLE",
      body: `${user.name} invited you to play a game of foos!`,
      recieverId: recieverId,
    }).then(() => {
      const id = uuidv4();
      const currentUserRef = doc(db, `notifications/${id}`);
      const day = new Date().toDateString();
      const time = new Date().toLocaleTimeString();
      setDoc(currentUserRef, {
        title: "INCOMING BATTLE",
        text: `${user.name} invited you to play a game of foos!`,
        id: recieverId,
        time: `${day} ${time}`,
      }).catch((err) => {
        console.log("error", err);
      });
    });
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
              playerOne={mockedUsers[1]}
              playerTwo={mockedUsers[2]}
              playerThree={mockedUsers[3]}
              playerFour={mockedUsers[4]}
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
              onChange={(e) => handleInput(e.target.value)}
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
                onClick={() => setIsInviteView(true)}
              >
                Continue
              </button>
            )}
           

            <h3 className="amount-invited">{invitedPlayers.length}/3 invited</h3>
            <div className="invited-players">
            {invitedPlayers.map((player, index) => {
            if (invitedPlayers.length > 1){
                return (
                <div className="invite-list" key={index}>
            <h3>{player}</h3>
            <button>Uninvite player</button>
            </div>
            )}
            
        })}
            </div>

            <div className="content">
              {/*  {invitationMode ? (
          <div className="invite-container">
            <InviteCard invitedName={name} onClick={handleSendInvite} />
          </div>
        ) : (
          <></>
        )} */}

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
                            handleInviteList(user.name, user.id)
                          /* handleInvitation(
                            user.name,
                            user.currentToken,
                            user.id
                          ) */
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
