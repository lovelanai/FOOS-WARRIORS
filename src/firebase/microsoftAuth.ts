import { getAuth, OAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getToken } from "firebase/messaging";
import { app, db, messaging } from "./firebase.config";

export const auth = getAuth(app);

const provider = new OAuthProvider("microsoft.com");
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithMicrosoft = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("additionaluserinfo", user);

      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then(async (item) => {
        if (!item.data()) {
          return await getToken(messaging, {
            vapidKey: import.meta.env.VITE_VAPID_KEY,
          })
            .then((currentToken) => {
              if (currentToken) {
                setDoc(doc(db, `users/${user.uid}`), {
                  name: user.displayName,
                  email: user.email,
                  img: user.photoURL,
                  description: "",
                  currentToken: currentToken,
                  id: user.uid,
                  wins: 0,
                  losses: 0,
                  ratio: "1.00",
                });
              }
            })
            .catch((err) => {
              setDoc(doc(db, `users/${user.uid}`), {
                name: user.displayName,
                email: user.email,
                img: user.photoURL,
                description: "",
                currentToken: "",
                id: user.uid,
                wins: 0,
                losses: 0,
                ratio: "1.00",
              });

              console.log("error", err);
            });
        }
      });
    })

    .catch((error) => {
      console.log("error", error);
    });
