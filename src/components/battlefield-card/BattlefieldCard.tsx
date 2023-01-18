import Logo from "@/assets/logos/logos";
import { mockedUser } from "@/mockedUsers/mockedUsers";
import "./BattlefieldCard.sass";

export interface TeamProps {
  playerOne: mockedUser;
  playerTwo: mockedUser;
  playerThree: mockedUser;
  playerFour: mockedUser;
  score?: string;
  winners?: string;
  content?: JSX.Element;
}

export const BattlefieldCard = ({
  playerOne,
  playerTwo,
  playerThree,
  playerFour,
  content,
}: TeamProps) => {
  return (
    <div className="battleFieldCard">
      <div className="team">
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
      <div className="matchContent">{content}</div>
      <div className="team">
        <div
          className="player"
          style={{ backgroundImage: `url(${playerThree.img})` }}
        >
          <div className="overlay -red">
            <h4 className="name">{playerThree.name}</h4>
          </div>
        </div>
        <div
          className="player"
          style={{ backgroundImage: `url(${playerFour.img})` }}
        >
          <div className="overlay -red">
            <h4 className="name">{playerFour.name}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface ResultProps {
  winners: WinnerProps;
  losers: LoserProps;
}

export interface WinnerProps {
  player1: mockedUser;
  player2: mockedUser;
  color: string;
}
export interface LoserProps {
  player1: mockedUser;
  player2: mockedUser;
  color: string;
}

export const BattlefieldWinnerCard = ({ winners, losers }: ResultProps) => {
  return (
    <div className="battleWinnerCard">
      <div className="winners">
        <div
          className="player"
          style={{ backgroundImage: `url(${winners.player1.img})` }}
        >
          <div
            className={`overlay ${winners.color === "pink" ? "-pink" : "-red"}`}
          >
            <h4 className="name">{winners.player1.name}</h4>
          </div>
        </div>
        <div
          className="player"
          style={{ backgroundImage: `url(${winners.player2.img})` }}
        >
          <div
            className={`overlay ${winners.color === "pink" ? "-pink" : "-red"}`}
          >
            <h4 className="name">{winners.player2.name}</h4>
          </div>
        </div>
      </div>
      <div className="losers">
        <div
          className="player"
          style={{ backgroundImage: `url(${losers.player1.img})` }}
        >
          <div
            className={`overlay ${winners.color === "pink" ? "-red" : "-pink"}`}
          >
            <h4 className="name">{losers.player1.name}</h4>
          </div>
        </div>
        <div
          className="player"
          style={{ backgroundImage: `url(${losers.player2.img})` }}
        >
          <div
            className={`overlay ${winners.color === "pink" ? "-red" : "-pink"}`}
          >
            <h4 className="name">{losers.player2.name}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
