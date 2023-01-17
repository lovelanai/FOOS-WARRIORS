import { useState } from "react";
import "./MyGameCard.sass";
import { mockedUser } from "@/mockedUsers/mockedUsers";
import { PlayerCard } from "../player-card/PlayerCard";
import { GameProps } from "@/utils/props";

export interface TeamProps {
  // playerOne: mockedUser;
  // playerTwo: mockedUser;
  // playerThree: mockedUser;
  // playerFour: mockedUser;
  gameName: string,
  data: [{
    player: string,
    id: string
  }]
}

export const MyGameCard = ({
  // playerOne,
  // playerTwo,
  // playerThree,
  // playerFour,
  data,
  gameName
}: TeamProps) => {
  const [teamUpMode, setTeamUpMode] = useState(false);

console.log("data", gameName)
  return (
    <>
      {!teamUpMode ? (
        <div className="my-game-card">
          <div className="text">
            <h3>{gameName}</h3>
            <p>
              Participants:
            </p>
          
            {data?.map((player: any, key: any) => { 
              return (
                <p key={key}>{player.name}</p>
                )
              })}
              </div>
          <div className="button">
            <button onClick={() => setTeamUpMode(true)}>Team-up</button>
          </div>
        </div>
      ) : (
        <div className="my-game-card-players">
          {data?.map((player: any, key: any) => {
return(

  <div key={key} className="playerCard">
            <div className="img" />
            <div className="aside">
              <h3 className="title">{player.name}</h3>
            </div>
          </div>
            )
          })}
        </div>
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
