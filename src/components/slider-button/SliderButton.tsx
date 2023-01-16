import "./SliderButton.sass";

interface SliderButtonProps {
  onClick: () => void;
  primary: string;
  secondary: string;
  state: boolean;
  id?: string;
}

export const SliderButton = ({
  onClick,
  primary,
  secondary,
  state,
  id,
}: SliderButtonProps) => {
  return (
    <div className="sliderButton" id={id}>
      <button
        onClick={onClick}
        className={`button ${!state ? "active" : ""}`}
        disabled={!state}
      >
        {primary}
      </button>
      <button
        onClick={onClick}
        className={`button ${state ? "active" : ""}`}
        disabled={state}
      >
        {secondary}
      </button>
      <div
        className={`background ${state ? "backgroundRight" : "backgroundLeft"}`}
      ></div>
    </div>
  );
};
