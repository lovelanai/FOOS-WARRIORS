import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getToken } from "firebase/messaging";
import { app, db, messaging } from "./firebase.config";

const provider = new GoogleAuthProvider();
// To apply the default browser preference instead of explicitly setting it.

const auth = getAuth(app);

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log(user);
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
      const errorMessage = error.message;

      console.log(errorMessage);
    });
