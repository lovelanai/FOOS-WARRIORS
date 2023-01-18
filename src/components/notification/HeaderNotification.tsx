import ICON from "@/assets/icons/icons";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import "./HeaderNotification.sass";

export const HeaderNotification = () => {
  const navigate = useNavigate();
  const { notifications, isLoading } = useUser();

  return (
    <div
      className="headerNotification"
      onClick={() => navigate("/notifications")}
    >
      <ICON.Bell className="icon" />
      {!isLoading ? <div className="circle">{notifications.length}</div> : null}
    </div>
  );
};
