import { useUser } from "@/context/UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { getToken, onMessage } from "firebase/messaging";
import { db, messaging } from "./firebase.config";
import { uuidv4 } from "@firebase/util";

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

/* export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload.notification);
      resolve(payload);
    });
  }); */

/* export const onMessageListener = () =>
  new Promise((resolve) => {
    const { loggedInUserId } = useUser();
    onMessage(messaging, (payload) => {
      console.log("payload", payload.notification);
      resolve(payload);
      const currentUserRef = doc(db, `notifications/${loggedInUserId}.notes`);
      setDoc(currentUserRef, {
        title: payload.notification?.title,
        text: payload.notification?.body,
        test: "rosanna",
      }).catch((err: any) => {
        console.log("error", err);
      });
    });
  }); */

export const onMessageListener = () =>
  new Promise((resolve) => {
    const { loggedInUserId } = useUser();

    onMessage(messaging, (payload) => {
      console.log("payload", payload.notification);

      resolve(payload);

      const id = uuidv4();

      const currentUserRef = doc(db, `notifications/${loggedInUserId}.${id}`);

      setDoc(currentUserRef, {
        title: payload.notification?.title,

        text: payload.notification?.body,

        test: "tetris",
      }).catch((err) => {
        console.log("error", err);
      });
    });
  });
