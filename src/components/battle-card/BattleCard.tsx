import ICON from "@/assets/icons/icons";
import Logo from "@/assets/logos/logos";
import { Teamprops } from "@/views/match-history/MatchHistory";
import { WinnerProps } from "../battlefield-card/BattlefieldCard";
import "./BattleCard.sass";

export interface BattleCardProps {
  pinkTeam: Teamprops;
  redTeam: Teamprops;
  winners: WinnerProps;
  winnerGoals: number;
  loserGoals: number;
  finished?: boolean;
}

export const BattleCard = ({
  pinkTeam,
  redTeam,
  winnerGoals,
  loserGoals,
  winners,
  finished,
}: BattleCardProps) => {
  return (
    <div className="battleCard">
      <div className="team">
        <div
          className="player"
          style={{ backgroundImage: `url(${pinkTeam.player1.img})` }}
        >
          <div className="overlay">
            <h4 className="name">{pinkTeam.player1.name}</h4>
          </div>
        </div>
        <div
          className="player"
          style={{ backgroundImage: `url(${pinkTeam.player2.img})` }}
        >
          <div className="overlay">
            <h4 className="name">{pinkTeam.player2.name}</h4>
          </div>
        </div>
      </div>
      <div className="matchContent">
        {finished ? (
          <>
            {winners.color === "pink" ? <ICON.PinkCrown /> : <ICON.RedCrown />}
            <div className="info">
              <h3 className="title">Winners</h3>
              {winners.color === "pink" ? (
                <p className="text -pink">Pink Team</p>
              ) : (
                <p className="text -red">Red Team</p>
              )}
            </div>
            <Logo.Ball />

            <div className="info">
              <h3 className="title">Score</h3>
              <p className="text">
                <span className="-pink">
                  {winners.color === "pink" ? winnerGoals : loserGoals}
                </span>
                <span>-</span>
                <span className="-red">
                  {winners.color !== "pink" ? winnerGoals : loserGoals}
                </span>
              </p>
            </div>
          </>
        ) : null}
      </div>
      <div className="team">
        <div
          className="player"
          style={{ backgroundImage: `url(${redTeam.player1.img})` }}
        >
          <div className="overlay -red">
            <h4 className="name">{redTeam.player1.name}</h4>
          </div>
        </div>
        <div
          className="player"
          style={{ backgroundImage: `url(${redTeam.player2.img})` }}
        >
          <div className="overlay -red">
            <h4 className="name">{redTeam.player2.name}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
