import ICON from "@/assets/icons/icons";
import { useUser } from "@/context/UserContext";
import { sendWebhookMessage } from "@/utils/hooks";
import { useNavigate } from "react-router-dom";
import "./Navigation.sass";

export const Navigation = () => {
  const { loggedInUserId } = useUser();

  const navigate = useNavigate();
  return (
    <div className="navigation">
      <div className="grid">
        <div className="gridItem">
          <div className="button" onClick={() => navigate("/findPlayers")}>
            <ICON.NavigationFind
              style={{ marginLeft: "1.5rem" }}
              className="icon"
            />
            <p className="text">Find Players</p>
          </div>
        </div>

        <div className="gridItem">
          <div className="button" onClick={() => navigate("/leaderboard")}>
            <ICON.NavigationCrown className="icon" />
            <p className="text">LeaderBoard</p>
          </div>
        </div>
        <div className="gridItem">
          <div className="button" onClick={() => navigate("/matchHistory")}>
            <ICON.NavigationCalendar className="icon" />
            <p className="text">Todays Battles</p>
          </div>
        </div>
        <div className="gridItem">
          <div
            className="button"
            onClick={() => navigate(`/profile/${loggedInUserId}`)}
          >
            <ICON.NavigationHead className="icon" />
            <p className="text">Profile</p>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="bigButton" onClick={() => navigate(`/games`)}>
          <ICON.NavigationSwords className="icon" />
          <p className="text">Battle</p>
        </div>
      </div>
    </div>
  );
};
