import { getAuth, OAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { app, db } from "./firebase.config";

export const auth = getAuth(app);

const provider = new OAuthProvider("microsoft.com");
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithMicrosoft = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("additionaluserinfo", user);

      const postById = doc(db, "users", user.uid);
      getDoc(postById).then((item) => {
        if (!item.data()) {
          setDoc(doc(db, `users/${user.uid}`), {
            name: user.displayName,
            email: user.email,
            img: user.photoURL,
            description: "",
          });
        } else {
          console.log("användare finns redan");
        }
      });
    })

    .catch((error) => {
      console.log("error", error);
    });
