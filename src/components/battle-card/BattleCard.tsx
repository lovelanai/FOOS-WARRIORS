import ICON from "@/assets/icons/icons";
import Logo from "@/assets/logos/logos";
import { mockedUser } from "@/mockedUsers/mockedUsers";
import "./BattleCard.sass";

export interface TeamProps {
  playerOne: mockedUser;
  playerTwo: mockedUser;
  playerThree: mockedUser;
  playerFour: mockedUser;
  pinkGoals?: string;
  redGoals?: string;
  winners?: boolean;
  finished?: boolean;
}

/**
 * @param finished
 * default false, if set to true, displays scoreboard in middle
 *
 * @param winners
 * default false, false = Pink Team : true = Red Team
 *
 */
export const BattleCard = ({
  playerOne,
  playerTwo,
  playerThree,
  playerFour,
  pinkGoals,
  redGoals,
  winners,
  finished,
}: TeamProps) => {
  return (
    <div className="battleCard">
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
      <div className="matchContent">
        {finished ? (
          <>
            {winners ? <ICON.RedCrown /> : <ICON.PinkCrown />}
            <div className="info">
              <h3 className="title">Winners</h3>
              {winners ? (
                <p className="text -red">Red Team</p>
              ) : (
                <p className="text -pink">Pink Team</p>
              )}
            </div>
            <Logo.Ball />

            <div className="info">
              <h3 className="title">Score</h3>
              <p className="text">
                <span className="-pink">{pinkGoals}</span>
                <span>-</span>
                <span className="-red">{redGoals}</span>
              </p>
            </div>
          </>
        ) : null}
      </div>
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
