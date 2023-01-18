import ICON from "@/assets/icons/icons";
import Logo from "@/assets/logos/logos";
import { useUser } from "@/context/UserContext";
import { db } from "@/firebase/firebase.config";
import { fetchWithMatch, useFetch } from "@/utils/hooks";
import { NotificationProps } from "@/utils/props";
import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SliderButton } from "../slider-button/SliderButton";
import "./NotificationCards.sass";

export const NotificationCards = () => {
  const { notifications, setNotifications, loggedInUserId } = useUser();
  const { response, isLoading } = fetchWithMatch(
    "notifications",
    "id",
    loggedInUserId
  );

  const [view, setView] = useState(false);

  const inviteFilter = (notification: NotificationProps) =>
    notification.title === "INCOMING BATTLE";

  const newsFilter = (notification: NotificationProps) =>
    notification.title !== "INCOMING BATTLE";

  const handleAccept = async (id: string) => {
    console.log("accept", id);
  };

  const handleDecline = async (id: string) => {
    setNotifications((current) =>
      current.filter((notifications) => {
        return notifications.id !== id;
      })
    );

    await deleteDoc(doc(db, "notifications", id)).then(() => {});
  };

  useEffect(() => {
    setNotifications(response);
  }, [response]);

  return (
    <>
      <SliderButton
        primary="Invites"
        secondary="Games"
        state={view}
        onClick={() => setView(!view)}
      />

      <div>
        {!view ? (
          <div className="notificationCard">
            {notifications
              .filter(inviteFilter)
              .map((invite: NotificationProps, index) => (
                <div key={index} className="invite">
                  <div className="img">
                    <Logo.Swords className="logo" />
                  </div>
                  <div className="info">
                    <p className="title">{invite.title}</p>
                    <p className="text">{invite.text}</p>
                    <p className="time">{invite.time}</p>
                  </div>
                  <div className="buttons">
                    <ICON.Check
                      className="icon"
                      onClick={() => handleAccept(invite.id)}
                    />
                    <ICON.Decline
                      className="icon"
                      onClick={() => handleDecline(invite.id)}
                    />
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="notificationCard">
            {notifications
              .filter(newsFilter)
              .map((res: NotificationProps, index) => (
                <div key={index} className="notification">
                  <div className="info">
                    <p className="title">{res.title}</p>
                    <p className="text">{res.text}</p>
                    <p className="time">{res.time}</p>
                  </div>
                  <div className="buttons">
                    <ICON.Trash className="icon" />
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};
