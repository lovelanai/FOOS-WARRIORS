import Logo from "@/assets/logos/logos";
import { Link } from "react-router-dom";
import "./Home.sass";
export const Home = () => {
  return (
    <div className="home">
      <Link className="playground" to="/playground">
        Playground <br />
        {`(dev)`}
      </Link>
      <div className="title">
        <h1 className="text">
          FOOS <br /> WARRIORS
        </h1>
        <Logo.Player className="logo" />
      </div>
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
          <Link to="/profile" className="link">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
};
