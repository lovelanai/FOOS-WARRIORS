import { useUser } from "@/context/UserContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "./firebase.config";

const auth = getAuth(app);
export const logout = () => {
  const { setError } = useUser();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log(auth);
    })
    .catch((error) => {
      console.log(error);
      setError({
        title: "Error",
        body: "Something went wrong while logging out... Try again",
      });
    });
};
