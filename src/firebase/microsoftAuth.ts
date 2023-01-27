// import { useUser } from "@/context/UserContext";
// import { getAuth, OAuthProvider, signInWithPopup } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { getToken } from "firebase/messaging";
// import { useNavigate } from "react-router-dom";
// import { app, db, messaging } from "./firebase.config";

import { getAuth } from "firebase/auth";
import { app } from "./firebase.config";

export const auth = getAuth(app);

// const provider = new OAuthProvider("microsoft.com");
// provider.setCustomParameters({ prompt: "select_account" });

// export const signInWithMicrosoft = () => {
//   const navigate = useNavigate();
//   const { isNotificationsAllowed } = useUser();
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       const user = result.user;
//       console.log("additionaluserinfo", user);

//       const userRef = doc(db, "users", user.uid);
//       getDoc(userRef).then(async (item) => {
//         if (!item.data()) {
//           if (isNotificationsAllowed) {
//             await getToken(messaging, {
//               vapidKey: import.meta.env.VITE_VAPID_KEY,
//             })
//               .then((currentToken) => {
//                 if (currentToken) {
//                   setDoc(doc(db, `users/${user.uid}`), {
//                     name: user.displayName,
//                     email: user.email,
//                     img: user.photoURL,
//                     description: "",
//                     currentToken: currentToken,
//                     id: user.uid,
//                     wins: 0,
//                     losses: 0,
//                     ratio: "1.00",
//                   });
//                   console.log("sign up och token finns");
//                 }
//               })
//               .then(() => {
//                 navigate("/home");
//               })
//               .catch((err) => {
//                 console.log("error", err);
//                 navigate("/");
//               });
//           } else {
//             setDoc(doc(db, `users/${user.uid}`), {
//               name: user.displayName,
//               email: user.email,
//               img: user.photoURL,
//               description: "",
//               currentToken: "",
//               id: user.uid,
//               wins: 0,
//               losses: 0,
//               ratio: "1.00",
//             }).then(() => {
//               console.log("sign up och token finns inte");
//               navigate("/home");
//             });
//           }
//         }
//       });
//     })
//     .catch((error) => {
//       console.log("error", error);
//       navigate("/");
//     });
// };
