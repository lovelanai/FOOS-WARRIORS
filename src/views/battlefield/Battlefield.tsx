import ICON from "@/assets/icons/icons";
import {
  BattlefieldCard,
  BattlefieldWinnerCard,
} from "@/components/battlefield-card/BattlefieldCard";
import { Header } from "@/components/header/Header";
import { PrimaryButton } from "@/components/primary-button/PrimaryButton";
import { useUser } from "@/context/UserContext";
import { db } from "@/firebase/firebase.config";
import { TeamProps } from "@/utils/props";
import { uuidv4 } from "@firebase/util";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Battlefield.sass";

export const Battlefield = () => {
  const navigate = useNavigate();
  const { loggedInUserId } = useUser();
  const goals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [winnerTeam, setWinnerTeam] = useState("");
  const [results, setResults] = useState(false);
  const location = useLocation();

  const [winners, setWinners] = useState<TeamProps>();
  const [losers, setLosers] = useState<TeamProps>();
  const [loserGoals, setLoserGoals] = useState(Number);

  console.log(winnerTeam);
  const handleToggleButtons = (value: string) => {
    if (value === "pinkTeam") {
      setWinnerTeam("pinkTeam");
    } else if (value === "redTeam") {
      setWinnerTeam("redTeam");
    }
  };

  const pinkTeam = {
    player1: location.state.pinkTeam[0],
    player2: location.state.pinkTeam[1],
    color: "pink",
  };

  const redTeam = {
    player1: location.state.redTeam[0],
    player2: location.state.redTeam[1],
    color: "red",
  };

  const handleSetResult = () => {
    setResults(true);
    if (winnerTeam === "redTeam") {
      setWinners(redTeam);
      setLosers(pinkTeam);
    }
    if (winnerTeam === "pinkTeam") {
      setWinners(pinkTeam);
      setLosers(redTeam);
    }
  };
  const today = new Date().getDate();
  const gameData = {
    date: today,
    hostId: loggedInUserId,
    winners: winners,
    winnnerGoals: 10,
    losers: losers,
    loserGoals: loserGoals,
    pinkTeam: {
      player1: pinkTeam.player1,
      player2: pinkTeam.player2,
    },
    redTeam: {
      player1: redTeam.player1,
      player2: redTeam.player2,
    },
  };
  const submitGame = () => {
    const id = uuidv4();
    const ref = doc(db, `matchHistory/${id}`);
    setDoc(ref, gameData)
      .then(async () => {
        await deleteDoc(doc(db, "games", loggedInUserId));
      })
      .then(() => {
        let wins = winners?.player1.wins! + 1;
        let losses = winners?.player1.losses;
        let gamesplayed = wins! + losses!;
        let ratio = (wins! / gamesplayed).toFixed(2);
        let playerId = winners?.player1.id;

        const updatedStats = {
          wins: wins,
          losses: losses,
          ratio: ratio,
        };
        console.log(playerId, updatedStats);
        const ref = doc(db, `users/${playerId}`);
        updateDoc(ref, updatedStats);
      })
      .then(() => {
        let playerId = winners?.player2.id;
        let wins = winners?.player2.wins! + 1;
        let losses = winners?.player2.losses;
        let gamesplayed = wins! + losses!;
        let ratio = (wins! / gamesplayed).toFixed(2);
        const updatedStats = {
          wins: wins,
          losses: losses,
          ratio: ratio,
        };
        console.log(playerId, updatedStats);
        const ref = doc(db, `users/${playerId}`);
        updateDoc(ref, updatedStats);
      })
      .then(() => {
        let playerId = losers?.player1.id;
        let wins = losers?.player1.wins!;
        let losses = losers?.player1.losses! + 1;
        let gamesplayed = wins! + losses!;
        let ratio = (wins! / gamesplayed).toFixed(2);
        const updatedStats = {
          wins: wins,
          losses: losses,
          ratio: ratio,
        };
        console.log(playerId, updatedStats);
        const ref = doc(db, `users/${playerId}`);
        updateDoc(ref, updatedStats);
      })
      .then(() => {
        let playerId = losers?.player2.id;
        let wins = losers?.player2.wins!;
        let losses = losers?.player2.losses! + 1;
        let gamesplayed = wins! + losses!;
        let ratio = (wins! / gamesplayed).toFixed(2);
        const updatedStats = {
          wins: wins,
          losses: losses,
          ratio: ratio,
        };
        console.log(playerId, updatedStats);
        const ref = doc(db, `users/${playerId}`);
        updateDoc(ref, updatedStats);
      });
  };

  const handleCancelGame = async () => {
    await deleteDoc(doc(db, "games", loggedInUserId)).then(() => {
      navigate("/games");
    });
  };

  return (
    <div className="battlefield">
      {!results ? (
        <div className="head">
          <Header
            title="BATTLEFIELD"
            element={
              <div onClick={() => navigate(-1)}>
                <ICON.Arrow />
              </div>
            }
          />
          {/* <div className="banner">
            <Logo.PlayerOnField className="icon" />
          </div> */}
        </div>
      ) : (
        <div className="winner">
          <Header
            title="WINNERS"
            element={
              <div onClick={() => setResults(false)}>
                <ICON.Arrow />
              </div>
            }
          />
          {winnerTeam === "pinkTeam" ? (
            <div className="banner">
              <ICON.Crown className="-pink" />
              <h3 className="text -pink">Pink Team</h3>
            </div>
          ) : (
            <div className="banner">
              <ICON.Crown className="-red" />
              <h3 className="text -red">Red Team</h3>
            </div>
          )}
        </div>
      )}

      <div
        className="card-view"
        style={results ? { height: "calc(100vh - 17.6rem)" } : {}}
      >
        {!results ? (
          <BattlefieldCard
            playerOne={pinkTeam.player1}
            playerTwo={pinkTeam.player2}
            playerThree={redTeam.player1}
            playerFour={redTeam.player2}
            content={
              <div className="register-result-section">
                <h2>Select Winner</h2>
                <div className="team-btns">
                  <button
                    className="pink-team"
                    onClick={() => handleToggleButtons("pinkTeam")}
                  >
                    {winnerTeam ? (
                      <>
                        {winnerTeam === "pinkTeam" ? (
                          <ICON.Crown />
                        ) : (
                          <ICON.Head />
                        )}
                      </>
                    ) : (
                      "Pink Team"
                    )}
                  </button>
                  <button
                    className="red-team"
                    onClick={() => handleToggleButtons("redTeam")}
                  >
                    {winnerTeam ? (
                      <>
                        {winnerTeam === "redTeam" ? (
                          <ICON.Crown />
                        ) : (
                          <ICON.Head />
                        )}
                      </>
                    ) : (
                      "Red Team"
                    )}
                  </button>
                </div>
                <PrimaryButton
                  secondary
                  disabled={!winnerTeam}
                  title="Enter Results"
                  onClick={handleSetResult}
                />
                <button className="cancel-btn" onClick={handleCancelGame}>
                  Cancel game
                </button>
              </div>
            }
          />
        ) : (
          <BattlefieldWinnerCard losers={losers!} winners={winners!} />
        )}
        <div
          className="results-mobile-view"
          style={results ? { display: "unset" } : {}}
        >
          <div className="register-result-section">
            {!results ? (
              <>
                <h2>Select Winner</h2>
                <div className="team-btns">
                  <button
                    className="pink-team"
                    onClick={() => handleToggleButtons("pinkTeam")}
                  >
                    {winnerTeam ? (
                      <>
                        {winnerTeam === "pinkTeam" ? (
                          <ICON.Crown />
                        ) : (
                          <ICON.Head />
                        )}
                      </>
                    ) : (
                      "Pink Team"
                    )}
                  </button>
                  <button
                    className="red-team"
                    onClick={() => handleToggleButtons("redTeam")}
                  >
                    {winnerTeam ? (
                      <>
                        {winnerTeam === "redTeam" ? (
                          <ICON.Crown />
                        ) : (
                          <ICON.Head />
                        )}
                      </>
                    ) : (
                      "Red Team"
                    )}
                  </button>
                </div>
                <PrimaryButton
                  secondary
                  disabled={!winnerTeam}
                  title="Enter Results"
                  onClick={handleSetResult}
                />
              </>
            ) : (
              <>
                <h2>Enter Score</h2>
                <div
                  className="team-btns"
                  style={
                    winnerTeam === "pinkTeam"
                      ? {}
                      : { flexDirection: "row-reverse" }
                  }
                >
                  <button
                    className={`winner ${
                      winners?.color === "pink" ? "pink-team" : "red-team"
                    }`}
                  >
                    <ICON.Crown />
                    10
                  </button>
                  <div
                    className={`loser ${
                      winners?.color === "pink" ? "red-team" : "pink-team"
                    }`}
                  >
                    <div className="number-container">
                      {goals.map((goal, index) => (
                        <button
                          className="goal-value"
                          key={index}
                          onClick={() => setLoserGoals(goal)}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <PrimaryButton
                  secondary
                  disabled={!gameData.loserGoals}
                  title="Finish Game"
                  onClick={submitGame}
                />
              </>
            )}
            <button className="cancel-btn" onClick={handleCancelGame}>
              Cancel game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
