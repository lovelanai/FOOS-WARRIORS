import ICON from "@/assets/icons/icons";
import { useRef } from "react";
import "./ImageUploader.sass";

interface ImageUploaderProps {
  onChange: (e: any) => void;
}

export const ImageUploader = ({ onChange }: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handeClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="imageUploader">
      <input
        accept="image/*"
        ref={inputRef}
        onChange={onChange}
        className="input"
        type="file"
      />
      <label onClick={handeClick} htmlFor="input">
        <ICON.Camera />
      </label>
    </div>
  );
};
