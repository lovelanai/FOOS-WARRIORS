import { CSSProperties } from "react";
import { PrimaryButton } from "../../buttons/primary-button/PrimaryButton";
import "./PlayerCard.sass";

interface PlayerCardProps {
  title: string;
  img: string;
  onClick?: () => void;
  buttonText: string;
  disabled?: boolean;
  style?: CSSProperties;
  id: string;
}

export const PlayerCard = ({
  img,
  title,
  onClick,
  buttonText,
  disabled,
  style,
  id,
}: PlayerCardProps) => {
  const winner = id === "6qe9o1NpaebPn5rgjdYQsTIl6U43";

  return (
    <div className={`playerCard ${winner ? "-winner" : ""}`} style={style}>
      <div
        className="img"
        style={{
          backgroundImage: `url(${img})`,
        }}
      />
      <div className="aside">
        <h3 className="title">{winner ? `♛ ${title} ♛` : title}</h3>
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
