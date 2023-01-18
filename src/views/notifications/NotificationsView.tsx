import ICON from "@/assets/icons/icons";
import { Header } from "@/components/header/Header";
import { HeaderNotification } from "@/components/notification/HeaderNotification";
import { NotificationCards } from "@/components/notification/NotificationCards";
import { useNavigate } from "react-router-dom";
import "./NotificationsView.sass";

export const NotificationsView = () => {
  const navigate = useNavigate();

  return (
    <div className="notificationsView">
      <Header
        element={
          <div onClick={() => navigate(-1)}>
            <ICON.Arrow />
          </div>
        }
        title="Notifications"
        asideElement={<HeaderNotification />}
      />
      <div className="content">
        <NotificationCards />
      </div>
    </div>
  );
};
