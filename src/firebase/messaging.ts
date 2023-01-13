import { useUser } from "@/context/UserContext";
import { uuidv4 } from "@firebase/util";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { getToken, onMessage } from "firebase/messaging";
import { db, messaging } from "./firebase.config";

export const requestForToken = async () => {
  const { loggedInUserId } = useUser();
  return await getToken(messaging, {
    vapidKey:
      "BNoVEWA6F5-4Do1k0o6QkdZRTKLulROCF-XyxtakcYioOHyLq6NLVzoBQyvA1LyGMi1FEa7jzpcn2JrWd6DtOO4",
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
      // console.log("Error accoured while recieving token", error);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    const { loggedInUserId } = useUser();
    onMessage(messaging, (payload) => {
      console.log("payload", payload.notification);
      resolve(payload);
      const id = uuidv4();
      const currentUserRef = doc(db, `notifications/${id}`);
      const day = new Date().toDateString();
      const time = new Date().toLocaleTimeString();
      setDoc(currentUserRef, {
        title: payload.notification?.title,
        text: payload.notification?.body,
        id: loggedInUserId,
        time: `${day} ${time}`,
      }).catch((err) => {
        console.log("error", err);
      });
    });
  });
