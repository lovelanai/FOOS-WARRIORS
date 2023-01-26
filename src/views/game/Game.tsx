import ICON from "@/assets/icons/icons";
import { PrimaryButton } from "@/components/buttons/primary-button/PrimaryButton";
import { CreateGameCard } from "@/components/cards/create-game-card/CreateGameCard";
import { GameCard } from "@/components/cards/game-card/GameCard";
import { PlayerCard } from "@/components/cards/player-card/PlayerCard";
import { Header } from "@/components/header/Header";
import { InputField } from "@/components/input/input-field/InputField";
import { Loader } from "@/components/loader/Loader";
import { useUser } from "@/context/UserContext";
import { db } from "@/firebase/firebase.config";
import { sendNotification, useFetch } from "@/utils/hooks";
import { GameProps, UserProps } from "@/utils/props";
import { PlayerCardSkeleton } from "@/views/find-players/skeleton/PlayerCardSkeleton";
import { uuidv4 } from "@firebase/util";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.sass";

export const Game = () => {
  const navigate = useNavigate();
  const { loggedInUserId, users, isLoading, setInvitedPlayerId } = useUser();

  const loggedInUser: UserProps = users.find(
    ({ id }) => id === loggedInUserId
  )!;
  const hostRef = query(
    collection(db, "games"),
    where("id", "==", loggedInUserId)
  );

  const [newGameMode, setNewGameMode] = useState(false);
  const [inviteMode, setInviteMode] = useState(false);
  const [inputValue, setInputValue] = useState("");

  interface invitedPlayerProps {
    name: string;
    id: string;
    img: string;
    wins: number;
    losses: number;
    token: string;
  }
  const [invitedPlayers, setInvitedPlayers] = useState([] as any);

  const [gameResponse, setGameResponse] = useState<GameProps>();
  const [gameIsLoading, setGameIsLoading] = useState(true);

  useEffect(() => {
    setGameIsLoading(true);
    getDocs(hostRef)
      .then((res) => {
        if (res.size > 0) {
          navigate(`/teamGenerator/${loggedInUserId}`, {
            state: { invitedPlayers: invitedPlayers },
          });
        }
      })
      .then(() => {
        if (loggedInUser && loggedInUserId) {
          const invitedPlayerRef = query(
            collection(db, "games"),
            where("players", "array-contains", loggedInUserId)
          );

          getDocs(invitedPlayerRef).then((res) => {
            if (res.size) {
              const resMap = res.docs.map((item) => {
                return { ...item.data(), id: item.id };
              }) as any;
              const gameDataArray = {
                ...(resMap[0] as unknown as any),
              };
              setGameResponse(gameDataArray);
            }
          });
        }
      })
      .finally(() => {
        setGameIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [users]);

  const handleInviteList = (
    name: string,
    id: string,
    token: string,
    img: string,
    wins: number,
    losses: number
  ) => {
    let newPlayer = { name, id, img, wins, losses, token };
    invitedPlayers.push(newPlayer);
    setInvitedPlayerId(id);
  };

  const removeFromInviteList = (player: {}) => {
    let updatedList = invitedPlayers.filter(
      (playerToRemove: any) => player != playerToRemove
    );
    setInvitedPlayers(updatedList);
  };

  const createGame = () => {
    const notificationFilter = invitedPlayers.filter(function (player: any) {
      return player.id !== loggedInUserId;
    });

    const host = {
      name: loggedInUser.name,
      id: loggedInUserId,
      img: loggedInUser.img,
      wins: loggedInUser.wins,
      losses: loggedInUser.losses,
      token: loggedInUser.currentToken,
    };
    invitedPlayers.push(host);

    let invitedPlayersId = invitedPlayers.map((user: invitedPlayerProps) => {
      return user.id;
    });
    setDoc(doc(db, `games/${loggedInUserId}`), {
      id: loggedInUserId,
      players: invitedPlayersId,
    }).then(() => {
      notificationFilter.forEach((player: any) => {
        sendNotification({
          to: player.token,
          title: "INCOMING BATTLE",
          body: `${loggedInUser.name} invited you to play a game of foos!`,
          recieverId: player.id,
        }).then(() => {
          const uid = uuidv4();
          const ref = doc(db, `notifications/${uid}`);
          const day = new Date().toDateString();
          const time = new Date().toLocaleTimeString();
          setDoc(ref, {
            title: "INCOMING BATTLE",
            text: `${loggedInUser.name} invited you to play a game of foos!`,
            id: player.id,
            time: `${day} ${time}`,
          }).catch((err) => {
            console.log("error", err);
          });
        });
      });
    });
    setNewGameMode(false);
    navigate(`/teamGenerator/${loggedInUserId}`, {
      state: { invitedPlayers: invitedPlayers },
    });
  };

  const searchFilter = (user: UserProps) =>
    inputValue === "" ||
    user.name.toLowerCase().includes(inputValue.toLowerCase());
  const removeLoggedInUser = (user: UserProps) => user.id !== loggedInUserId;
  const invitedPlayer1 = (user: UserProps) => user.id !== invitedPlayers[0]?.id;
  const invitedPlayer2 = (user: UserProps) => user.id !== invitedPlayers[1]?.id;
  const invitedPlayer3 = (user: UserProps) => user.id !== invitedPlayers[2]?.id;

  const playersInGame = [] as any;
  gameResponse?.players.forEach((res) => {
    playersInGame.push(users.find(({ id }) => id === res));
  });

  return (
    <div className="game">
      {!gameIsLoading ? (
        <>
          {gameResponse && !gameIsLoading ? (
            <GameCard players={playersInGame} id={gameResponse.id} />
          ) : (
            <>
              {!newGameMode ? (
                <>
                  <Header
                    element={
                      <div onClick={() => navigate("/home")}>
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
                  <div className="inviteView">
                    <div className="invitedPlayers">
                      {invitedPlayers.map((player: any, index: any) => {
                        <div key={index}></div>;

                        if (invitedPlayers.length > 0) {
                          return (
                            <div className="inviteList" key={index}>
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
                    <div className="info">
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
                            .filter(removeLoggedInUser)
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
            </>
          )}
        </>
      ) : (
        <div className="loaderContainer">
          <Loader />
        </div>
      )}
    </div>
  );
};
