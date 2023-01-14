import { getAuth, OAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getToken } from "firebase/messaging";
import { app, db, messaging } from "./firebase.config";
import { requestForToken } from "./messaging";

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
            vapidKey:
              "BNoVEWA6F5-4Do1k0o6QkdZRTKLulROCF-XyxtakcYioOHyLq6NLVzoBQyvA1LyGMi1FEa7jzpcn2JrWd6DtOO4",
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
                });
              }
            })
            .catch((err) => {
              console.log("error", err);
            });
        } else {
          console.log("användare finns redan");
        }
      });
    })

    .catch((error) => {
      console.log("error", error);
    });
