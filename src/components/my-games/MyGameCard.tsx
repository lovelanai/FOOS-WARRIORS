import ICON from "@/assets/icons/icons";
import { useUser } from "@/context/UserContext";
import { GameProps } from "@/utils/props";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyGameCard.sass";

export const MyGameCard = ({ gameName, players }: GameProps) => {
  const [teamUpMode, setTeamUpMode] = useState(false);
  const [pinkTeam, setPinkTeam] = useState([{}]);
  const [redTeam, setRedTeam] = useState([{}]);
  const [isTeamsSet, setIsTeamsSet] = useState(false);
  const { active, finished } = useUser();
  const navigate = useNavigate();

  const randomTeams = () => {
    setTeamUpMode(true);
    setTimeout(() => {
      const randomArray = players
        .sort(() => Math.random() - Math.random())
        .slice(0, 4);
      const splitArray = Math.ceil(randomArray.length / 2);
      const pinkTeam = randomArray.splice(0, splitArray);
      const redTeam = randomArray.splice(-splitArray);
      setPinkTeam(pinkTeam);
      setRedTeam(redTeam);
      setIsTeamsSet(true);
    }, 3000);
  };

  return (
    <>
      {active ? (
        <>
          {!teamUpMode ? (
            <div className="my-game-card">
              <div className="text">
                <h3>{gameName}</h3>
                <p className="title">Participants:</p>

                {players.map((player, key: any) => {
                  return (
                    //IKON: check eller klocka beroende på om personen hunnit accepterat eller ej
                    // När alla accepterat kommer knappen med "team-up"
                    <p key={key}>{player.name} IKON</p>
                  );
                })}
              </div>
              <div className="button">
                <button onClick={randomTeams}>Team-up</button>
              </div>
            </div>
          ) : teamUpMode && !isTeamsSet ? (
            <>
              <div className="my-game-card-players">
                {players.map((player, key: any) => {
                  return (
                    <div key={key} className="playerCard">
                      <div
                        className="img"
                        style={{
                          backgroundImage: `url(${player.img})`,
                        }}
                      />
                      <div className="aside">
                        <h3 className="title">{player.name}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="my-game-card-players-teamed">
                {pinkTeam.map((player: any, key: any) => {
                  return (
                    <div key={key} className="playerCard">
                      <div
                        className="img"
                        style={{
                          backgroundImage: `url(${player.img})`,
                        }}
                      />
                      <div className="aside">
                        <h3 className="title">{player.name}</h3>
                      </div>
                    </div>
                  );
                })}
                {redTeam.map((player: any, key: any) => {
                  return (
                    <div key={key} className="playerCard">
                      <div
                        className="img"
                        style={{
                          backgroundImage: `url(${player.img})`,
                        }}
                      />
                      <div className="aside">
                        <h3 className="title">{player.name}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="team-n-results">
                <h3>Pink Team</h3>
                <button
                  onClick={() =>
                    navigate("/battlefield", {
                      state: { pinkTeam: pinkTeam, redTeam: redTeam },
                    })
                  }
                >
                  Add result
                </button>
                <h3>Red Team</h3>
              </div>
            </>
          )}
        </>
      ) : finished ? (
        <>
          <div className="my-game-card-finished">
            {players.map((player: any, key: any) => {
              return (
                //pink-team inx 0, 1. red-team inx 2, 3. styr bakgrunden.
                <div key={key} className="playerCard">
                  <div
                    className="img"
                    style={{
                      backgroundImage: `url(${player.img})`,
                    }}
                  />
                  <div className="aside">
                    <h3 className="title">{player.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="team-n-results">
            <h2>
              <ICON.CrownBlack style={{ width: "4rem" }} /> 10
            </h2>
            <h2>6</h2>
          </div>
        </>
      ) : (
        <>hej</>
      )}
    </>
  );
};

export const GamesImInCard = () => {
  return (
    <div className="game-card">
      <div className="text">
        <h3>Game name</h3>
        <p>
          Participants:<br></br>x, x, x och x
        </p>
      </div>
    </div>
  );
};
