import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../primary-button/PrimaryButton";

import "./PlayerCard.sass";

interface playerCard {
  title: string;
  img: string;
  profileLink?: string;
  id?: string;
  inviteOnClick?: () => void;
}

export const PlayerCard = ({
  img,
  title,
  profileLink,
  inviteOnClick,
  id,
}: playerCard) => {
  const navigate = useNavigate();

  const { isInviteView, invitedPlayerId } = useUser();

  /* console.log("ID: ", invitedPlayerId)
console.log("KEY: ", id) */

  return (
    <div className="playerCard">
      <div
        className="img"
        style={{
          backgroundImage: `url(${img})`,
        }}
      />
      <div className="aside">
        <h3 className="title">{title}</h3>
        <div className="button-container">
          {/* <div className="icon" onClick={inviteOnClick}><ICON.Invite/></div> */}
          {isInviteView && invitedPlayerId !== id ? (
            <PrimaryButton
              title="Invite player"
              profileButton
              onClick={inviteOnClick}
            />
          ) : isInviteView && invitedPlayerId === id ? (
            <PrimaryButton
              title="DISABLED"
              profileButton
              disabled={true}
              //onClick={() => navigate(`/profile/${profileLink}`)}
            />
          ) : (
            <PrimaryButton
              title="View profile"
              profileButton
              onClick={() => navigate(`/profile/${profileLink}`)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
