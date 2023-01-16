import { useNavigate } from "react-router-dom";
import ICON from "@/assets/icons/icons";
import Logo from "@/assets/logos/logos";
import { BattleCard } from "@/components/battle-card/BattleCard";
import { Header } from "@/components/header/Header";
import { mockedUsers } from "@/mockedUsers/mockedUsers";
import "./MatchHistory.sass";
import { HeaderNotification } from "@/components/notification/HeaderNotification";

export const MatchHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="matchHistory">
      <div className="nav">
        <Header
          element={
            <div onClick={() => navigate(-1)}>
              <ICON.Arrow />
            </div>
          }
          title="Todays Battles"
          asideElement={<HeaderNotification />}
        />
        <div className="banner">
          <Logo.Swords />
        </div>
      </div>
      <div className="battles">
        <BattleCard
          playerOne={mockedUsers[0]}
          playerTwo={mockedUsers[1]}
          playerThree={mockedUsers[2]}
          playerFour={mockedUsers[3]}
          pinkGoals="10"
          redGoals="5"
          finished
        />
        <BattleCard
          playerOne={mockedUsers[0]}
          playerTwo={mockedUsers[1]}
          playerThree={mockedUsers[2]}
          playerFour={mockedUsers[3]}
          pinkGoals="3"
          redGoals="10"
          winners
          finished
        />
      </div>
    </div>
  );
};
