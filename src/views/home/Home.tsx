import { Link } from "react-router-dom";
import "./Home.sass";
export const Home = () => {
  return (
    <div className="home">
      <div className="link">
        <Link to="/playground">Playground</Link>
      </div>
      <div className="link">
        <Link to="/leaderboard">LeaderBoard</Link>
      </div>
      <div className="link">
        <Link to="/findPlayers">FindPlayers</Link>
      </div>
      <div className="link">
        <Link to="/matchHistory">MatchHistory</Link>
      </div>
      <div className="link">
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
};
