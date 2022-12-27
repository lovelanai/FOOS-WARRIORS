import ICON from "@/assets/icons/icons";
import { Header } from "@/components/header/Header";
import { InputField } from "@/components/input-field/InputField";
import { PlayerCard } from "@/components/player-card/PlayerCard";
import { mockedUsers } from "@/mockedUsers/mockedUsers";
import "./FindPlayers.sass";

export const FindPlayers = () => {
  return (
    <div className="findPlayers">
      <div className="nav">
        <Header icon={<ICON.Arrow />} link="/" title="Find Players" />
        <div className="banner">
          <InputField placeholder="Search..." />
        </div>
      </div>
      <div className="content">
        <PlayerCard title={mockedUsers[0].name} img={mockedUsers[0].img} />
        <PlayerCard title={mockedUsers[1].name} img={mockedUsers[1].img} />
        <PlayerCard title={mockedUsers[2].name} img={mockedUsers[2].img} />
        <PlayerCard title={mockedUsers[3].name} img={mockedUsers[3].img} />
        <PlayerCard title={mockedUsers[4].name} img={mockedUsers[4].img} />
        <PlayerCard title={mockedUsers[5].name} img={mockedUsers[5].img} />
      </div>
    </div>
  );
};
