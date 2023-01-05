import Logo from "../../assets/logos/logos";
import { mockedUser } from "../../mockedUsers/mockedUsers";
import "./BattlefieldCard.sass";

export interface TeamProps {
  playerOne: mockedUser;
  playerTwo: mockedUser;
  playerThree: mockedUser;
  playerFour: mockedUser;
  score?: string;
  winners?: string;
}

export const BattlefieldCard = ({
  playerOne,
  playerTwo,
  playerThree,
  playerFour,
  score,
  winners,
}: TeamProps) => {
  return (
    <div className="battleCard">
      <div className="pinkTeam">
        <div
          className="player"
          style={{ backgroundImage: `url(${playerOne.img})` }}
        >
          <div className="overlay">
            <h4 className="name">{playerOne.name}</h4>
          </div>
        </div>
        <div
          className="player"
          style={{ backgroundImage: `url(${playerTwo.img})` }}
        >
          <div className="overlay">
            <h4 className="name">{playerTwo.name}</h4>
          </div>
        </div>
      </div>
      <div className="matchContent">
        <Logo.Ball />
          <h3 className="title">VS</h3>
      </div>
      <div className="redTeam">
        <div
          className="player"
          style={{ backgroundImage: `url(${playerThree.img})` }}
        >
          <div className="overlay">
            <h4 className="name">{playerThree.name}</h4>
          </div>
        </div>
        <div
          className="player"
          style={{ backgroundImage: `url(${playerFour.img})` }}
        >
          <div className="overlay">
            <h4 className="name">{playerFour.name}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
