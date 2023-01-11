import { useUser } from "@/context/UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { getToken, onMessage } from "firebase/messaging";
import { db, messaging } from "./firebase.config";

export const requestForToken = () => {
  const { loggedInUserId } = useUser();
  return getToken(messaging, {
    vapidKey:
      "BNoVEWA6F5-4Do1k0o6QkdZRTKLulROCF-XyxtakcYioOHyLq6NLVzoBQyvA1LyGMi1FEa7jzpcn2JrWd6DtOO4",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client:", currentToken);
        const sendTokenToServer = doc(db, `users/${loggedInUserId}`);
        updateDoc(sendTokenToServer, {
          currentToken: currentToken,
        });
      } else {
        console.log("no registration token available.");
      }
    })
    .catch((error) => {
      console.log("Error accoured while recieving token", error);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
