import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { app, db } from "./firebase.config";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
provider.setCustomParameters({
  login_hint: "user@example.com",
});

// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();

const auth = getAuth(app);
auth.languageCode = "it";

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);

      const user = result.user;
      console.log(user);
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
      const errorMessage = error.message;

      console.log(errorMessage);
    });
