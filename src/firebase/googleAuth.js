import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      setDoc(doc(db, `users/${user.uid}`), {
        name: user.displayName,
        email: user.email,
        img: user.photoURL,
        description: "",
      });
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      console.log(errorMessage);
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
