import ICON from "@/assets/icons/icons";
import { useUser } from "@/context/UserContext";
import { Link } from "react-router-dom";
import "./Profile.sass";

export const Profile = () => {
  return (
    <div className="profile">
      <div className="header">
        <Link to="/">
          <ICON.Arrow />
        </Link>
        <h3>Profile</h3>
      </div>
      <div className="img-container">
        <div
          className="img"
          style={{
            backgroundImage:
              "url(https://nationaltoday.com/wp-content/uploads/2022/05/107-Johnny-Depp.jpg)",
          }}
        />
      </div>
      <div className="info">
        <h3 className="name">Johnny Depp</h3>
        <p className="bio">Big baller high roller NPC</p>
        <div className="stats">
          <div>
            <p className="value">26</p>
            <p className="type">Wins</p>
            <p>____</p>
          </div>
          <div>
            <p className="value">14</p>
            <p className="type">Losses</p>
            <p>____</p>
          </div>
          <div>
            <p className="value">1.4325</p>
            <p className="type">Ratio</p>
            <p>____</p>
          </div>
        </div>
      </div>
    </div>
  );
};
