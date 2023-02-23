import ICON from "@/assets/icons/icons";
import Logo from "@/assets/logos/logos";
import { BattleCard } from "@/components/cards/battle-card/BattleCard";
import { Header } from "@/components/header/Header";

import { fetchWithMatch } from "@/utils/hooks";
import { TeamProps } from "@/utils/props";
import { useNavigate } from "react-router-dom";
import "./MatchHistory.sass";
import { BattleCardSkeleton } from "./skeleton/BattleCardSkeleton";

export const MatchHistory = () => {
  const navigate = useNavigate();
  const today = new Date().getDate();
  const { response, isLoading } = fetchWithMatch(
    "todaysBattles",
    "date",
    today,
    true
  );

  interface GameDataProps {
    id: string;
    hostId: string;
    winners: TeamProps;
    winnnerGoals: number;
    loserGoals: number;
    pinkTeam: TeamProps;
    redTeam: TeamProps;
  }

  return (
    <div className="matchHistory">
      <div className="nav">
        <Header
          element={
            <div onClick={() => navigate("/home")}>
              <ICON.Arrow />
            </div>
          }
          title="Todays Battles"
        />
        <div className="banner">
          <Logo.Swords />
        </div>
      </div>
      <div className="battles">
        {!isLoading ? (
          <>
            {response.length ? (
              <>
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
              </>
            ) : (
              <div className="-fallback">
                <h1 className="text">Currently no games played today!</h1>
                <Logo.Offline className="icon" />
              </div>
            )}
          </>
        ) : (
          <>
            {Array(2)
              .fill(null)
              .map((key, index) => (
                <BattleCardSkeleton key={index} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};
