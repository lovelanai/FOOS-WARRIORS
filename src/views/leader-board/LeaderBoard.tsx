import ICON from "@/assets/icons/icons";
import { Link } from "react-router-dom";
import "./LeaderBoard.sass";
export const LeaderBoard = () => {
  return (
    <div>
      <Link to="/">
        <ICON.Arrow />
      </Link>
      LeaderBoard
    </div>
  );
};
