import "./PrimaryButton.sass";

interface PrimaryButtonProps {
  title?: string;
  onClick?: () => void;
  secondary?: boolean;
  profileButton?: boolean;
  icon?: JSX.Element;
  disabled?: boolean;
  submit?: boolean;
}

export const PrimaryButton = ({
  title,
  onClick,
  secondary = false,
  profileButton = false,
  icon,
  disabled = false,
  submit,
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
      type={submit ? "submit" : "button"}
    >
      <span className="title">{title}</span>
      <div className="icon">{icon}</div>
    </button>
  );
};
