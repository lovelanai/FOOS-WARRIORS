import "./PrimaryButton.sass";

interface ButtonProps {
  title?: string;
  onClick?: () => void;
  secondary?: boolean;
  profileButton?: boolean;
}

export const PrimaryButton = ({
  title,
  onClick,
  secondary = false,
  profileButton = false,
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
    </div>
  );
};
