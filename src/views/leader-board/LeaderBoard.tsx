import ICON from "../../assets/icons/icons";
import { Header } from "../../components/header/Header";

import "./LeaderBoard.sass";
export const LeaderBoard = () => {
  return (
    <div className="leaderBoard">
      <Header icon={<ICON.Arrow />} link="/home" title="Leaderboard" />
    </div>
  );
};
