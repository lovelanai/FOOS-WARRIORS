import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../primary-button/PrimaryButton";

import "./PlayerCard.sass";

interface playerCard {
  title: string;
  img: string;
  profileLink?: string;
}

export const PlayerCard = ({ img, title, profileLink }: playerCard) => {
  const navigate = useNavigate();

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
        <PrimaryButton
          title="view profile"
          profileButton
          onClick={() => navigate(`/profile/${profileLink}`)}
        />
      </div>
    </div>
  );
};
