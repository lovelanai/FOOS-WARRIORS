import { getAuth, signOut } from "firebase/auth";
import { app } from "./firebase.config";

const auth = getAuth(app);
export const logout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log(auth);
    })
    .catch((error) => {
      console.log(error);
    });
};
