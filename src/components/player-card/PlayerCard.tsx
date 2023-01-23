import { CSSProperties } from "react";
import { PrimaryButton } from "../primary-button/PrimaryButton";

import "./PlayerCard.sass";

interface PlayerCardProps {
  title: string;
  img: string;
  onClick?: () => void;
  buttonText: string;
  disabled?: boolean;
  style?: CSSProperties;
}

export const PlayerCard = ({
  img,
  title,
  onClick,
  buttonText,
  disabled,
  style,
}: PlayerCardProps) => {
  return (
    <div className="playerCard" style={style}>
      <div
        className="img"
        style={{
          backgroundImage: `url(${img})`,
        }}
      />
      <div className="aside">
        <h3 className="title">{title}</h3>
        <div className="button-container">
          <PrimaryButton
            disabled={disabled}
            title={buttonText}
            profileButton
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};
