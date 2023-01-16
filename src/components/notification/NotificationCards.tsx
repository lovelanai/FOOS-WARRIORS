import ICON from "@/assets/icons/icons";
import Logo from "@/assets/logos/logos";
import { useUser } from "@/context/UserContext";
import { fetchWithMatch } from "@/utils/hooks";
import { NotificationProps } from "@/utils/props";
import "./NotificationCards.sass";

export const NewNotifications = () => {
  const { loggedInUserId } = useUser();
  const { response } = fetchWithMatch("notifications", "id", loggedInUserId);
  console.log(response);

  const inviteFilter = (notification: NotificationProps) =>
    notification.title === "INCOMING BATTLE";

  return (
    <div className="notificationCard">
      {response.filter(inviteFilter).map((res: NotificationProps, index) => (
        <div key={index} className="invite">
          <div className="img">
            <Logo.Swords className="logo" />
          </div>
          <div className="info">
            <p className="title">{res.title}</p>
            <p className="text">{res.text}</p>
            <p className="time">{res.time}</p>
          </div>
          <div className="buttons">
            <ICON.Check className="icon" /* onClick={accept()} */ />
            <ICON.Decline className="icon" /* onClick={decline()} */ />
          </div>
        </div>
      ))}
    </div>
  );
};

export const OldNotifications = () => {
  const { loggedInUserId } = useUser();
  const { response } = fetchWithMatch("notifications", "id", loggedInUserId);
  const inviteFilter = (notification: NotificationProps) =>
    notification.title !== "INCOMING BATTLE";
  return (
    <div className="notificationCard">
      {response.filter(inviteFilter).map((res: NotificationProps, index) => (
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
  );
};
