import { getAuth, signOut } from "firebase/auth";
import { app } from "./firebase.config";

const auth = getAuth(app);
export const HandleSignOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log(auth);
    })
    .catch((error) => {
      // An error happened.
    });
};
