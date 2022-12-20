import ICON from "@/assets/icons/icons";
import { Link } from "react-router-dom";
import "./Playground.sass";

export const Playground = () => {
  return (
    <div className="playground">
      <Link to="/">
        <ICON.Arrow />
      </Link>
      <h1 className="test">playground</h1>
    </div>
  );
};
