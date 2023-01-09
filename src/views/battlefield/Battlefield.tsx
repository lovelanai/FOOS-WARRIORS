import Logo from "../../assets/logos/logos";
import "./Battlefield.sass";
import { mockedUsers } from "../../mockedUsers/mockedUsers";
import {
  BattlefieldCard,
  BattlefieldWinnerCard,
} from "../../components/battlefield-card/BattlefieldCard";
import { PrimaryButton } from "../../components/primary-button/PrimaryButton";
import { useState } from "react";
import ICON from "../../assets/icons/icons";

export const Battlefield = () => {
  const goals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [winnerTeam, setWinnerTeam] = useState("");
  const [results, setResults] = useState(false);

  console.log(winnerTeam);
  const handleToggleButtons = (value: string) => {
    if (value === "pinkTeam") {
      setWinnerTeam("pinkTeam");
    } else if (value === "redTeam") {
      setWinnerTeam("redTeam");
    }
  };

  return (
    <div className="battlefield">
      {winnerTeam === "pinkTeam" && results ? (
        <div className="head pink-winner">
          <h2>WINNERS</h2>
          <div>
            <ICON.Crown className="icon" />
            <h3>Pink Team</h3>
          </div>
        </div>
      ) : winnerTeam === "redTeam" && results ? (
        <div className="head red-winner">
          <h2>WINNERS</h2>
          <div>
            <ICON.Crown className="icon" />
            <h3>Red Team</h3>
          </div>
        </div>
      ) : (
        <div className="head">
          <h2>BATTLEFIELD</h2>
          <Logo.PlayerOnField />
        </div>
      )}

      {!results ? (
        <div className="card-view">
          <BattlefieldCard
            playerOne={mockedUsers[1]}
            playerTwo={mockedUsers[4]}
            playerThree={mockedUsers[5]}
            playerFour={mockedUsers[2]}
          />
        </div>
      ) : (
        <div className="card-view">
          <BattlefieldWinnerCard
            playerOne={mockedUsers[1]}
            playerTwo={mockedUsers[4]}
            playerThree={mockedUsers[5]}
            playerFour={mockedUsers[2]}
            winners={winnerTeam}
          />
        </div>
      )}

      <div className="register-result-section">
        <h2>Select Winner</h2>
        {winnerTeam === "" ? (
          <div className="team-btns">
            <button
              className="pink-team"
              onClick={() => handleToggleButtons("pinkTeam")}
            >
              Pink Team
            </button>
            <button
              className="red-team"
              onClick={() => handleToggleButtons("redTeam")}
            >
              Red Team
            </button>
          </div>
        ) : winnerTeam === "pinkTeam" && !results ? (
          <div className="team-btns">
            <button
              className="pink-team"
              onClick={() => handleToggleButtons("pinkTeam")}
            >
              <ICON.Crown />
            </button>
            <button
              className="red-team"
              onClick={() => handleToggleButtons("redTeam")}
            >
              <ICON.Head />
            </button>
          </div>
        ) : winnerTeam === "redTeam" && !results ? (
          <div className="team-btns">
            <button
              className="pink-team"
              onClick={() => handleToggleButtons("pinkTeam")}
            >
              <ICON.Head />
            </button>
            <button
              className="red-team"
              onClick={() => handleToggleButtons("redTeam")}
            >
              <ICON.Crown />
            </button>
          </div>
        ) : winnerTeam === "pinkTeam" && results ? (
          <div className="team-btns">
              <button className="pink-team winner">
              <ICON.Crown />
              10
            </button>
            <div className="red-team loser">
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
        ) : winnerTeam === "redTeam" && results ? (
          <div className="team-btns">
            <div className="pink-team loser">
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
            <button className="red-team winner">
              <ICON.Crown />
              10
            </button>
          </div>
        ) : (
          <></>
        )}
        {!results ? (
          <PrimaryButton
            secondary
            title="Enter Results"
            onClick={() => setResults(true)}
          />
        ) : (
          <PrimaryButton secondary title="Finish Game" />
        )}
        <button className="cancel-btn">Cancel game</button>
      </div>
    </div>
  );
};
