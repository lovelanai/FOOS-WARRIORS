import ICON from "@/assets/icons/icons";
import Logo from "@/assets/logos/logos";
import { PrimaryButton } from "../../buttons/primary-button/PrimaryButton";
import { InvitePlayers } from "../invite-players/InvitePlayers";
import "./CreateGameCard.sass";

interface CreateGameCardProps {
  onClick: () => void;
  invite: () => void;
  showInvite: boolean;
  closeModal: () => void;
}

export const CreateGameCard = ({
  onClick,
  invite,
  showInvite,
  closeModal,
}: CreateGameCardProps) => {
  return (
    <div className="createGameCard">
      {showInvite ? (
        <InvitePlayers closeModal={closeModal} />
      ) : (
        <div className="cardContainer">
          <div className="logo">
            <Logo.BattleSkull className="icon" />
          </div>
          <p className="text">
            You're currently not in any game. Send out an invite or proceed to
            create a game!
          </p>
          <PrimaryButton
            title="Create Invitation"
            onClick={invite}
            icon={<ICON.Add />}
          />
          <PrimaryButton
            title="Create Game"
            onClick={onClick}
            icon={<ICON.Add />}
          />
        </div>
      )}
    </div>
  );
};
