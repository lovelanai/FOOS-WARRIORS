import ICON from "@/assets/icons/icons";
import { Link } from "react-router-dom";
import "./Profile.sass";

export const Profile = () => {
  return (
    <div>
      <Link to="/">
        <ICON.Arrow />
      </Link>
      Profile
    </div>
  );
};
