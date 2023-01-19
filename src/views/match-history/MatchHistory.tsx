import { useNavigate } from "react-router-dom";
import ICON from "@/assets/icons/icons";
import Logo from "@/assets/logos/logos";
import { BattleCard } from "@/components/battle-card/BattleCard";
import { Header } from "@/components/header/Header";
import { mockedUsers } from "@/mockedUsers/mockedUsers";
import "./MatchHistory.sass";
import { HeaderNotification } from "@/components/notification/HeaderNotification";
import { useFetch } from "@/utils/hooks";
import { UserProps } from "@/utils/props";
import { WinnerProps } from "@/components/battlefield-card/BattlefieldCard";

export interface Teamprops {
  player1: UserProps;
  player2: UserProps;
}

export const MatchHistory = () => {
  const navigate = useNavigate();
  const { response, isLoading } = useFetch("matchHistory");
  console.log(response);

  interface GameDataProps {
    id: string;
    hostId: string;
    winners: WinnerProps;
    winnnerGoals: number;
    loserGoals: number;
    pinkTeam: Teamprops;
    redTeam: Teamprops;
  }

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
        {response.map((data: GameDataProps) => {
          return (
            <BattleCard
              key={data.id}
              pinkTeam={data.pinkTeam}
              redTeam={data.redTeam}
              winners={data.winners}
              winnerGoals={data.winnnerGoals}
              loserGoals={data.loserGoals}
              finished
            />
          );
        })}
      </div>
    </div>
  );
};
