import { useState } from "react";
import "./MyGameCard.sass";
import { mockedUser } from "@/mockedUsers/mockedUsers";
import { PlayerCard } from "../player-card/PlayerCard";

export interface TeamProps {
  playerOne: mockedUser;
  playerTwo: mockedUser;
  playerThree: mockedUser;
  playerFour: mockedUser;
}

export const MyGameCard = ({
  playerOne,
  playerTwo,
  playerThree,
  playerFour,
}: TeamProps) => {
  const [teamUpMode, setTeamUpMode] = useState(false);

  return (
    <>
      {!teamUpMode ? (
        <div className="my-game-card">
          <div className="text">
            <h3>Game name</h3>
            <p>
              Participants:<br></br> x, x, x och x
            </p>
          </div>
          <div className="button">
            <button onClick={() => setTeamUpMode(true)}>Team-up</button>
          </div>
        </div>
      ) : (
        <div className="my-game-card-players">
          <div className="playerCard">
            <div className="img" />
            <div className="aside">
              <h3 className="title">{playerOne.name}</h3>
            </div>
          </div>
          <div className="playerCard">
            <div className="img" />
            <div className="aside">
              <h3 className="title">{playerTwo.name}</h3>
            </div>
          </div>
          <div className="playerCard">
            <div className="img" />
            <div className="aside">
              <h3 className="title">{playerThree.name}</h3>
            </div>
          </div>
          <div className="playerCard">
            <div className="img" />
            <div className="aside">
              <h3 className="title">{playerFour.name}</h3>
            </div>
          </div>
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
