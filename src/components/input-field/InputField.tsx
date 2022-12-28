import ICON from "src/assets/icons/icons";
import "./InputField.sass";

interface inputFieldProps {
  placeholder: string;
}

export const InputField = ({ placeholder }: inputFieldProps) => {
  return (
    <div className="inputField">
      <input className="input" type="text" placeholder={placeholder} />
      <ICON.Search className="icon" />
    </div>
  );
};
