import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./Navigation.sass";

export const Navigation = () => {
  const { loggedInUserId } = useUser();
  return (
    <div className="navigation">
      <div className="button">
        <Link to="/findPlayers" className="link">
          Find Players
        </Link>
      </div>
      <div className="button">
        <Link to="/leaderboard" className="link">
          LeaderBoard
        </Link>
      </div>
      <div className="button">
        <Link to="/matchHistory" className="link">
          Todays Battles
        </Link>
      </div>
      <div className="button">
        <Link to={`/profile/${loggedInUserId}`} className="link">
          Profile
        </Link>
      </div>
    </div>
  );
};
