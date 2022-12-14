import { useNavigate } from "react-router-dom";
import ICON from "@/assets/icons/icons";
import { Header } from "@/components/header/Header";
import "./LeaderBoard.sass";

export const LeaderBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="leaderBoard">
      <Header
        element={
          <div onClick={() => navigate(-1)}>
            <ICON.Arrow />
          </div>
        }
        title="Leaderboard"
      />
    </div>
  );
};
