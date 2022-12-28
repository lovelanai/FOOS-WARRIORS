import ICON from "src/assets/icons/icons";
import Logo from "src/assets/logos/logos";
import { BattleCard } from "src/components/battle-card/BattleCard";
import { Header } from "src/components/header/Header";
import { mockedUsers } from "src/mockedUsers/mockedUsers";
import "./MatchHistory.sass";

export const MatchHistory = () => {
  console.log(mockedUsers[0]);
  return (
    <div className="matchHistory">
      <div className="nav">
        <Header icon={<ICON.Arrow />} link="/" title="Todays Battles" />
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
