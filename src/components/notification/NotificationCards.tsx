import ICON from "@/assets/icons/icons";
import { useUser } from "@/context/UserContext";
import { fetchWithMatch } from "@/utils/hooks";
import { NotificationProps } from "@/utils/props";
import "./NotificationCards.sass";

export const NewNotifications = () => {
  const { loggedInUserId } = useUser();
  const { response } = fetchWithMatch("notifications", "id", loggedInUserId);
  const newNotifications = [
    "notis" + " " + 1,
    "notis" + " " + 2,
    "notis" + " " + 3,
    "notis" + " " + 4,
    "notis" + " " + 5,
  ];

  console.log(response);

  return (
    <div className="container">
      {response.map((res: NotificationProps, index) => (
        <div key={index} className="new-card">
          <div>
            <p>{res.title}</p>
            <p>{res.text}</p>
            <p>{res.time}</p>
          </div>
          <div>
            <ICON.Check className="icon" /* onClick={accept()} */ />{" "}
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
    <div className="container">
      {oldNotifications.map((notification, index) => (
        <div key={index} className="old-card">
          <div>
            <p>{notification}</p>
            <p>åååå-mm-dd</p>
          </div>
          <div>
            <ICON.Trash className="icon" /* onClick={delete()} */ />
          </div>
        </div>
      ))}
    </div>
  );
};
