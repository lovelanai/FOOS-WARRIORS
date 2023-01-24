import ICON from "@/assets/icons/icons";
import "./InputField.sass";

interface inputFieldProps {
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: any) => void;
}

export const InputField = ({
  placeholder,
  type,
  value,
  onChange,
}: inputFieldProps) => {
  return (
    <div className="inputField">
      <input
        className="input"
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />

      {value ? null : <ICON.Search className="icon" />}
    </div>
  );
};
