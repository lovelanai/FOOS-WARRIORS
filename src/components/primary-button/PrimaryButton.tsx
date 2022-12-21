import "./PrimaryButton.sass";

interface ButtonProps {
  title?: string;
  onClick?: () => void;
  secondary?: boolean;
}

export const PrimaryButton = ({
  title,
  onClick,
  secondary = false,
}: ButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`primaryButton ${secondary ? "-secondary" : ""}`}
    >
      <span className="title">{title}</span>
    </div>
  );
};
