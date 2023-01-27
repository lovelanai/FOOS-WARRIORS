import { useUser } from "@/context/UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { getToken, onMessage } from "firebase/messaging";
import { db, messaging } from "./firebase.config";

export const requestForToken = async () => {
  let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const { loggedInUserId, isNotificationsAllowed, iphoneCheck } = useUser();
  if (isNotificationsAllowed && !iphoneCheck && !isSafari) {
    return await getToken(messaging!, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
    })
      .then((currentToken) => {
        console.log("funkar");
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
    onMessage(messaging!, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
