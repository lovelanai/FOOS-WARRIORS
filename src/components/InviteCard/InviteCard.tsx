import ICON from "@/assets/icons/icons";
import "./InviteCard.sass";

interface InviteCard {
  invitedName: string;
  onClick?: () => void;
}

export const InviteCard = ({ invitedName, onClick }: InviteCard) => {
  return (
    <div className="container">
      <div className="icon">
        <ICON.Invite />
      </div>
      <h2>Invite {invitedName} </h2>
      <p>Create a new game name</p>
      <input placeholder="Enter game name.."></input>
      <p>Or..</p>
      <p>Add to existing</p>
      <select></select>

      <button onClick={onClick}>Send invite</button>
    </div>
  );
};
