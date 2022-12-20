import ICON from "@/assets/icons/icons";
import { Link } from "react-router-dom";
import "./FindPlayers.sass";

export const FindPlayers = () => {
  return (
    <div>
      <Link to="/">
        <ICON.Arrow />
      </Link>
      Find Players
    </div>
  );
};
