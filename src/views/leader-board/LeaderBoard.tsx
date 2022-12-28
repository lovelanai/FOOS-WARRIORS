import ICON from "src/assets/icons/icons";
import { Header } from "src/components/header/Header";
import "./LeaderBoard.sass";
export const LeaderBoard = () => {
  return (
    <div className="leaderBoard">
      <Header icon={<ICON.Arrow />} link="/" title="Leaderboard" />
    </div>
  );
};
