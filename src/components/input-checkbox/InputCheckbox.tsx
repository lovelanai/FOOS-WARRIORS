import { useRef } from "react";
import "./InputCheckbox.sass";

interface InputCheckBoxProps {
  onClick: (e: any) => void;
  title: string | number;
}

export const InputCheckbox = ({ onClick, title }: InputCheckBoxProps) => {
  return (
    <div className="inputCheckbox" onClick={onClick}>
      <h2 className="title">{title}</h2>
    </div>
  );
};
