import ICON from "@/assets/icons/icons";
import { Link } from "react-router-dom";
import "./MatchHistory.sass";

export const MatchHistory = () => {
  return (
    <div>
      <Link to="/">
        <ICON.Arrow />
      </Link>
      MatchHistory
    </div>
  );
};
