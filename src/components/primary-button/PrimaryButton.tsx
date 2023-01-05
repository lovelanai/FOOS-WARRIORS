import "./PrimaryButton.sass";

interface ButtonProps {
  title?: string;
  onClick?: () => void;
  secondary?: boolean;
  profileButton?: boolean;
  icon?: JSX.Element;
}

export const PrimaryButton = ({
  title,
  onClick,
  secondary = false,
  profileButton = false,
  icon,
}: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={
        !profileButton
          ? `primaryButton ${secondary ? "-secondary" : ""}`
          : "profileButton"
      }
    >
      <span className="title">{title}</span>
      <div className="icon">{icon}</div>
    </div>
  );
};
