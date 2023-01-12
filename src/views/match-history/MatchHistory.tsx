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
          asideElement={<HeaderNotification/>}
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
          winners="Pink Team"
          score="7-3"
        />
        <BattleCard
          playerOne={mockedUsers[2]}
          playerTwo={mockedUsers[4]}
          playerThree={mockedUsers[5]}
          playerFour={mockedUsers[2]}
          winners="Red Team"
          score="0-10"
        />
      </div>
    </div>
  );
};
