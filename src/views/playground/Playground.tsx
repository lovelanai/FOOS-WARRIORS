import { BattleCard } from "@/components/battle-card/BattleCard";
import { mockedUsers } from "@/mockedUsers/mockedUsers";
import "./Playground.sass";

export const Playground = () => {
  return (
    <div className="playground">
      <BattleCard
        playerOne={mockedUsers[0]}
        playerTwo={mockedUsers[1]}
        playerThree={mockedUsers[2]}
        playerFour={mockedUsers[3]}
        pinkGoals="10"
        redGoals="5"
        finished
      />
    </div>
  );
};
