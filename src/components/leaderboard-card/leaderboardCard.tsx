import { PrimaryButton } from "../primary-button/PrimaryButton";
import "./leaderboardCard.sass";

interface leaderboardCard {
  title: string;
  img: string;
  score: number;
  profileLink?: string;
}

export const LeaderboardCard = ({ img, title, score }: leaderboardCard) => {
  return (
    <div className="leaderboardCard">
      <div
        className="img"
        style={{
          backgroundImage: `url(${img})`,
        }}
      />

      <div className="aside">
        <div className="rank">{score}</div>
        <div className="column">
          <h3 className="title">{title}</h3>
          <PrimaryButton title="view profile" profileButton />
        </div>
      </div>
    </div>
  );
};
