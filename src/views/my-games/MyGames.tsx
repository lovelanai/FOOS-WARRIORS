import ICON from "@/assets/icons/icons";
import { CreateGameCard } from "@/components/create-game-card/CreateGameCard";
import { Header } from "@/components/header/Header";
import { InputField } from "@/components/input-field/InputField";
import { PlayerCard } from "@/components/player-card/PlayerCard";
import { PrimaryButton } from "@/components/primary-button/PrimaryButton";
import { useUser } from "@/context/UserContext";
import { db } from "@/firebase/firebase.config";
import { sendNotification } from "@/utils/hooks";
import { UserProps } from "@/utils/props";
import { PlayerCardSkeleton } from "@/views/find-players/skeleton/PlayerCardSkeleton";
import { uuidv4 } from "@firebase/util";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyGames.sass";

export const MyGames = () => {
  const navigate = useNavigate();
  const { loggedInUserId, users, isLoading, setInvitedPlayerId } = useUser();

  const user: UserProps = users.find(({ id }) => id === loggedInUserId)!;
  const ref = query(collection(db, "games"), where("id", "==", loggedInUserId));

  const [newGameMode, setNewGameMode] = useState(false);
  const [inviteMode, setInviteMode] = useState(false);
  const [inputValue, setInputValue] = useState("");
  interface invitedPlayerProps {
    name: string;
    id: string;
    img: string;
    wins: number;
    losses: number;
  }
  const [invitedPlayers, setInvitedPlayers] = useState(
    [] as invitedPlayerProps[]
  );

  useEffect(() => {
    getDocs(ref)
      .then((res) => {
        console.log(res.size);
        if (res.size > 0) {
          navigate(`/teamGenerator/${loggedInUserId}`);
        } else {
          return;
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleInviteList = (
    name: string,
    id: string,
    token: string,
    img: string,
    wins: number,
    losses: number
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
        id: id,
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
      id: loggedInUserId,
      img: user.img,
      wins: user.wins,
      losses: user.losses,
    };
    invitedPlayers.push(host);
    setDoc(doc(db, `games/${loggedInUserId}`), {
      id: loggedInUserId,
      players: invitedPlayers,
    });
    setNewGameMode(false);
    navigate(`/teamGenerator/${loggedInUserId}`);
  };

  const searchFilter = (user: UserProps) =>
    inputValue === "" ||
    user.name.toLowerCase().includes(inputValue.toLowerCase());
  const removeLoggedInUser = (user: UserProps) => user.id !== loggedInUserId;
  const invitedPlayer1 = (user: UserProps) => user.id !== invitedPlayers[0]?.id;
  const invitedPlayer2 = (user: UserProps) => user.id !== invitedPlayers[1]?.id;
  const invitedPlayer3 = (user: UserProps) => user.id !== invitedPlayers[2]?.id;

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
            title="Battle"
          />
          <CreateGameCard
            onClick={() => {
              setNewGameMode(true);
              setInviteMode(true);
            }}
          />
        </>
      ) : newGameMode && inviteMode ? (
        <>
          <Header
            title="Invite players"
            element={
              <div onClick={() => navigate(-1)}>
                <ICON.Arrow />
              </div>
            }
          />
          {invitedPlayers.length !== 3 ? (
            <div className="inputField">
              <InputField
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                type="search"
                placeholder="Search..."
              />
            </div>
          ) : null}
          <div className="invite-view">
            <div className="invited-players">
              {invitedPlayers.map((player: any, index: any) => {
                <div key={index}></div>;
                console.log(player);
                if (invitedPlayers.length > 0) {
                  return (
                    <div className="invite-list" key={index}>
                      <PlayerCard
                        title={player.name}
                        buttonText="Remove"
                        onClick={() => removeFromInviteList(player)}
                        img={player.img}
                        style={
                          invitedPlayers.length >= 3
                            ? {
                                height: "18vh",
                                transition: ".2s ease-in",
                              }
                            : {}
                        }
                      />
                    </div>
                  );
                }
              })}
            </div>
            <div className="amount-invited">
              <p className="text">{invitedPlayers.length}/3 invited</p>
            </div>

            {invitedPlayers.length === 3 ? (
              <div className="button">
                <PrimaryButton
                  onClick={createGame}
                  title="Continue"
                  secondary
                />
              </div>
            ) : null}
            <div
              className="content"
              style={
                invitedPlayers.length >= 3
                  ? { display: "none" }
                  : invitedPlayers.length === 2
                  ? { height: "calc(100vh - 35rem)" }
                  : invitedPlayers.length === 1
                  ? { height: "calc(100vh - 28rem)" }
                  : {}
              }
            >
              {users && !isLoading ? (
                <>
                  {users
                    .filter(searchFilter)
                    // .filter(removeLoggedInUser)
                    .filter(invitedPlayer1)
                    .filter(invitedPlayer2)
                    .filter(invitedPlayer3)
                    .map((user: UserProps) => (
                      <PlayerCard
                        title={user.name}
                        img={user.img}
                        key={user.id}
                        disabled={invitedPlayers.length > 2}
                        buttonText="invite player"
                        onClick={() =>
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
