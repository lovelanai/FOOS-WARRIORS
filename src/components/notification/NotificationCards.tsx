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

  return (
    <div className="notificationCard">
      {response.map((res: NotificationProps, index) => (
        <div key={index} className="new-card">
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
  const oldNotifications = [
    "notis" + " " + 1,
    "notis" + " " + 2,
    "notis" + " " + 3,
    "notis" + " " + 4,
    "notis" + " " + 5,
  ];
  return (
    <></>
    // <div className="container">
    //   {oldNotifications.map((notification, index) => (
    //     <div key={index} className="old-card">
    //       <div>
    //         <p>{notification}</p>
    //         <p>åååå-mm-dd</p>
    //       </div>
    //       <div>
    //         <ICON.Trash className="icon" /* onClick={delete()} */ />
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};
