import ICON from "@/assets/icons/icons";
import { Header } from "@/components/header/Header";
import { HeaderNotification } from "@/components/notification/HeaderNotification";
import {
  NewNotifications,
  OldNotifications,
} from "@/components/notification/NotificationCards";
import { SliderButton } from "@/components/slider-button/SliderButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NotificationsView.sass";

export const NotificationsView = () => {
  const [view, setView] = useState(false);
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
        <SliderButton
          primary="Invites"
          secondary="Games"
          state={view}
          onClick={() => setView(!view)}
        />
        <div className="notifications">
          {!view ? <NewNotifications /> : <OldNotifications />}
        </div>
      </div>
    </div>
  );
};
