import { Link } from "react-router-dom";
import ICON from "src/assets/icons/icons";
import "./Playground.sass";

export const Playground = () => {
  return (
    <div className="playground">
      <Link to="/">
        <ICON.Arrow />
      </Link>
      <h1 className="h1">playground</h1>
    </div>
  );
};
