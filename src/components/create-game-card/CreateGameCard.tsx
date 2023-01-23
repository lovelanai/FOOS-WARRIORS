import ICON from "@/assets/icons/icons";
import Logo from "@/assets/logos/logos";
import { PrimaryButton } from "../primary-button/PrimaryButton";
import "./CreateGameCard.sass";

interface CreateGameCardProps {
  onClick: () => void;
}

export const CreateGameCard = ({ onClick }: CreateGameCardProps) => {
  return (
    <div className="createGameCard">
      <div className="cardContainer">
        <div className="logo">
          <Logo.BattleSkull className="icon" />
        </div>
        <p className="text">
          You're currently not in any game. Create a game as host, or accept
          invites to play!
        </p>
        <PrimaryButton
          title="Create Game"
          onClick={onClick}
          icon={<ICON.Add />}
        />
      </div>
    </div>
  );
};
