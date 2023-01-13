import ICON from "@/assets/icons/icons";
import { useUser } from "@/context/UserContext";
import { fetchWithMatch } from "@/utils/hooks";
import { useNavigate } from "react-router-dom";
import "./HeaderNotification.sass";

export const HeaderNotification = () => {
  const navigate = useNavigate();
  const { loggedInUserId } = useUser();
  const { response, isLoading } = fetchWithMatch(
    "notifications",
    "id",
    loggedInUserId
  );

  console.log(response.length);
  return (
    <div
      className="headerNotification"
      onClick={() => navigate("/notifications")}
    >
      <ICON.Bell className="icon" />
      {!isLoading ? <div className="circle">{response.length}</div> : null}
    </div>
  );
};
