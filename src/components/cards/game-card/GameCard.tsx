import ICON from "@/assets/icons/icons";
import { UserProps } from "@/utils/props";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../buttons/primary-button/PrimaryButton";
import { Header } from "../../header/Header";
import { BattlefieldCard } from "../battlefield-card/BattlefieldCard";
import { PlayerFrame } from "../player-frame/PlayerFrame";
import "./GameCard.sass";

interface MyGameCardProps {
  id: string;
  players: [UserProps];
  host?: boolean;
}

export const GameCard = ({ players, id, host }: MyGameCardProps) => {
  const navigate = useNavigate();
  const [pinkTeam, setPinkTeam] = useState([] as any);
  const [redTeam, setRedTeam] = useState([] as any);
  const [isTeamsSet, setIsTeamsSet] = useState(false);
  const [displayTeams, setDisplayTeams] = useState(false);

  const randomTeams = () => {
    const randomArray = players
      .sort(() => Math.random() - Math.random())
      .slice(0, 4);
    const splitArray = Math.ceil(randomArray.length / 2);
    const pinkTeam = randomArray.splice(0, splitArray);
    const redTeam = randomArray.splice(-splitArray);
    setIsTeamsSet(true);
    setTimeout(() => {
      setDisplayTeams(true);
      setPinkTeam(pinkTeam);
      setRedTeam(redTeam);
    }, 2000);
  };

  const pinkTeamData = {
    player1: pinkTeam[0],
    player2: pinkTeam[1],
    color: "pink",
  };
  const redTeamData = {
    player1: redTeam[0],
    player2: redTeam[1],
    color: "red",
  };

  return (
    <div className="gameCard">
      {host ? null : (
        <Header
          title="Battle"
          element={
            <div onClick={() => navigate("/home")}>
              <ICON.Arrow />
            </div>
          }
        />
      )}
      {!displayTeams ? (
        <>
          {host ? null : (
            <div className="message">
              <h2 className="title">Time for battle!</h2>
              <h3 className="text">
                Displayed players are waiting at the Foos Table
              </h3>
            </div>
          )}
          <div
            className={`playersGrid ${
              isTeamsSet ? "teamShuffleAnimation" : ""
            }`}
          >
            <>
              {players.map((player, key: any) => {
                return (
                  <div
                    className={`players ${isTeamsSet ? "teamSpin" : ""}`}
                    key={key}
                  >
                    <PlayerFrame
                      img={player.img}
                      title={player.name}
                      key={player.id}
                    />
                  </div>
                );
              })}
            </>
          </div>
          {host ? (
            <div className="buttonContainer">
              <PrimaryButton onClick={randomTeams} title="Team-up" secondary />
            </div>
          ) : null}
        </>
      ) : (
        <div className="teamContainer displayTeams">
          {pinkTeamData.player1 && redTeamData.player1 ? (
            <BattlefieldCard
              playerOne={pinkTeamData.player1}
              playerTwo={pinkTeamData.player2}
              content={
                <div className="register-result-section">
                  <h2>Teams successfully generated</h2>
                  <PrimaryButton
                    onClick={() =>
                      navigate("/battlefield", {
                        state: { pinkTeam: pinkTeam, redTeam: redTeam },
                      })
                    }
                    title="To Battlefield"
                    secondary
                  />
                </div>
              }
              playerThree={redTeamData.player1}
              playerFour={redTeamData.player2}
            />
          ) : null}
          <div className="results-mobile-view">
            <div className="register-result-section">
              <h2>Teams successfully generated</h2>
              <PrimaryButton
                onClick={() =>
                  navigate("/battlefield", {
                    state: { pinkTeam: pinkTeam, redTeam: redTeam },
                  })
                }
                title="To Battlefield"
                secondary
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
