import "./PrimaryButton.sass";

interface PrimaryButtonProps {
  title?: string;
  onClick?: () => void;
  secondary?: boolean;
  profileButton?: boolean;
  icon?: JSX.Element;
  disabled?: boolean;
}

export const PrimaryButton = ({
  title,
  onClick,
  secondary = false,
  profileButton = false,
  icon,
  disabled = false,
}: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        !profileButton
          ? `primaryButton ${secondary ? "-secondary" : ""}`
          : "profileButton"
      }
    >
      <span className="title">{title}</span>
      <div className="icon">{icon}</div>
    </button>
  );
};
