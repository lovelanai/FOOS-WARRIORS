import { Link } from "react-router-dom";
import ICON from "../../assets/icons/icons";

import "./Playground.sass";

export const Playground = () => {
  return (
    <div className="playground">
      <Link to="/home">
        <ICON.Arrow />
      </Link>
      <h1 className="h1">playground</h1>
    </div>
  );
};
