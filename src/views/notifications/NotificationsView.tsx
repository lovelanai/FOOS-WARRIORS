import ICON from "@/assets/icons/icons";
import { Header } from "@/components/header/Header";
import { HeaderNotification } from "@/components/notification/HeaderNotification";
import { NotificationCards } from "@/components/notification/NotificationCards";
import { SliderButton } from "@/components/slider-button/SliderButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NotificationsView.sass";

export const NotificationsView = () => {
  const navigate = useNavigate();
  const [view, setView] = useState(false);

  return (
    <div className="notificationsView">
      <div className="nav">
        <Header
          element={
            <div onClick={() => navigate(-1)}>
              <ICON.Arrow />
            </div>
          }
          title="Notifications"
          asideElement={<HeaderNotification />}
        />
        <div className="button">
          <SliderButton
            primary="Invites"
            secondary="News"
            state={view}
            onClick={() => setView(!view)}
          />
        </div>
      </div>
      <div className="content">
        <NotificationCards state={view} />
      </div>
    </div>
  );
};
