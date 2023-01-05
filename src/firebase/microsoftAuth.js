import { getAuth, OAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { app, db } from "./firebase.config";

export const auth = getAuth(app);

const provider = new OAuthProvider("microsoft.com");
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithMicrosoft = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("additionaluserinfo", user);
      setDoc(doc(db, `users/${user.uid}`), {
        name: user.displayName,
        email: user.email,
        img: user.photoURL,
        description: "",
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
