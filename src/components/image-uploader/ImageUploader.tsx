import { useRef } from "react";
import ICON from "../../assets/icons/icons";
import "./ImageUploader.sass";

interface ImageUploaderInterface {
  onChange: (e: any) => void;
}

export const ImageUploader = ({ onChange }: ImageUploaderInterface) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handeClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="imageUploader">
      <input ref={inputRef} onChange={onChange} className="input" type="file" />
      <label onClick={handeClick} htmlFor="input">
        <ICON.Camera />
      </label>
    </div>
  );
};
