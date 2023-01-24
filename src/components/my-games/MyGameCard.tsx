import { useUser } from "@/context/UserContext";
import { db } from "@/firebase/firebase.config";
import { GameProps } from "@/utils/props";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BattlefieldCard } from "../battlefield-card/BattlefieldCard";
import { PlayerFrame } from "../player-frame/PlayerFrame";
import { PrimaryButton } from "../primary-button/PrimaryButton";
import "./MyGameCard.sass";

export const MyGameCard = ({ players, id }: GameProps) => {
  const navigate = useNavigate();
  const { loggedInUserId } = useUser();
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
    <>
      {!displayTeams ? (
        <>
          <div
            className={`playersGrid ${
              isTeamsSet ? "teamShuffleAnimation" : ""
            }`}
          >
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
          </div>
          <div>
            <PrimaryButton onClick={randomTeams} title="Team-up" secondary />
          </div>
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
    </>
  );
};
