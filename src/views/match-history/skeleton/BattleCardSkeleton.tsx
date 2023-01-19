import { Loader } from "@/components/loader/Loader";
import "./BattleCardSkeleton.sass";

export const BattleCardSkeleton = () => {
  return (
    <div className="battleCardSkeleton">
      <div className="team">
        <div className="player">
          <div className="overlay"></div>
        </div>
        <div className="player">
          <div className="overlay"></div>
        </div>
      </div>
      <div className="matchContent">
        <Loader />
      </div>
      <div className="team">
        <div className="player">
          <div className="overlay -red"></div>
        </div>
        <div className="player">
          <div className="overlay -red"></div>
        </div>
      </div>
    </div>
  );
};
