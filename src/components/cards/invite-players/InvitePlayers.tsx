import { PrimaryButton } from "@/components/buttons/primary-button/PrimaryButton";
import { useUser } from "@/context/UserContext";
import { sendWebhookMessage } from "@/utils/hooks";
import { UserProps } from "@/utils/props";
import { useState } from "react";

import "./InvitePlayers.sass";

interface InvitePlayersProps {
  closeModal: () => void;
}

export const InvitePlayers = ({ closeModal }: InvitePlayersProps) => {
  const [number, setNumber] = useState("");
  const { users, loggedInUserId } = useUser();
  const userConnectedToProfile: UserProps = users.find(
    ({ id }) => id === loggedInUserId
  )!;
  const userData = { ...(userConnectedToProfile as unknown as UserProps) };

  const handleSubmit = () => {
    sendWebhookMessage(number, userData?.name);
    closeModal();
  };

  return (
    <div className="invitePlayers">
      <h1 className="title">Select amount of players you want to invite</h1>
      <div className="grid">
        <div className="gridItem">
          <div className="button" onClick={() => setNumber("1")}>
            <h1>1</h1>
          </div>
        </div>
        <div className="gridItem">
          <div className="button" onClick={() => setNumber("2")}>
            <h1>2</h1>
          </div>
        </div>

        <div className="gridItem">
          <div className="button" onClick={() => setNumber("3")}>
            <h1>3</h1>
          </div>
        </div>
      </div>
      <div className="aside">
        <h3>Selected: {number}</h3>
        <PrimaryButton secondary title="Submit invite" onClick={handleSubmit} />
        or
        <p className="cancel" onClick={closeModal}>
          Cancel invitation
        </p>
      </div>
    </div>
  );
};
