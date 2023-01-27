import { useUser } from "@/context/UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { getToken, onMessage } from "firebase/messaging";
import { db, messaging } from "./firebase.config";

export const requestForToken = async () => {
  const { loggedInUserId, isNotificationsAllowed } = useUser();
  if (isNotificationsAllowed) {
    return await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
    })
      .then((currentToken) => {
        if (currentToken) {
          const sendTokenToServer = doc(db, `users/${loggedInUserId}`);

          updateDoc(sendTokenToServer, {
            currentToken: currentToken,
          }).catch((err) => {
            console.log("error", err);
          });
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
