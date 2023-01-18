import ICON from "@/assets/icons/icons";
import Logo from "@/assets/logos/logos";
import {
  BattlefieldCard,
  BattlefieldWinnerCard,
  LoserProps,
  TestProps,
  WinnerProps,
} from "@/components/battlefield-card/BattlefieldCard";
import { Header } from "@/components/header/Header";
import { PrimaryButton } from "@/components/primary-button/PrimaryButton";
import { mockedUsers } from "@/mockedUsers/mockedUsers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Battlefield.sass";

export const Battlefield = () => {
  const navigate = useNavigate();
  const goals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [winnerTeam, setWinnerTeam] = useState("");
  const [results, setResults] = useState(false);

  const [winners, setWinners] = useState<WinnerProps>();
  const [losers, setLosers] = useState<LoserProps>();

  console.log(winnerTeam);
  const handleToggleButtons = (value: string) => {
    if (value === "pinkTeam") {
      setWinnerTeam("pinkTeam");
    } else if (value === "redTeam") {
      setWinnerTeam("redTeam");
    }
  };

  const pinkTeam = {
    player1: mockedUsers[0],
    player2: mockedUsers[1],
    color: "pink",
  };

  const redTeam = {
    player1: mockedUsers[2],
    player2: mockedUsers[3],
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

  console.log("winners", winners);
  console.log("losers", losers);

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
        // style={results ? { height: "calc(100vh - 9.3rem)" } : {}}
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
                <button className="cancel-btn">Cancel game</button>
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
                          onClick={() => console.log(goal)}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <PrimaryButton
                  secondary
                  disabled={true}
                  title="Finish Game"
                  onClick={handleSetResult}
                />
              </>
            )}
            <button className="cancel-btn">Cancel game</button>
          </div>
        </div>
      </div>
    </div>
  );
};
