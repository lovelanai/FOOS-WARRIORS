import ICON from "@/assets/icons/icons";
import { PrimaryButton } from "@/components/buttons/primary-button/PrimaryButton";
import { useUser } from "@/context/UserContext";
import { app, db, messaging } from "@/firebase/firebase.config";

import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getToken } from "firebase/messaging";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.sass";

export const LogIn = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isNotificationsAllowed, users, setUsers, iphoneCheck } =
    useUser();
  const auth = getAuth(app);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    } else return;
  }, [isLoggedIn, navigate]);

  const microsoftProvider = new OAuthProvider("microsoft.com");
  microsoftProvider.setCustomParameters({ prompt: "select_account" });
  const signInWithMicrosoft = () => {
    signInWithPopup(auth, microsoftProvider)
      .then((result) => {
        const user = result.user;
        console.log("additionaluserinfo", user);

        const userRef = doc(db, "users", user.uid);
        getDoc(userRef).then(async (item) => {
          if (!item.data()) {
            if (isNotificationsAllowed && !iphoneCheck) {
              await getToken(messaging, {
                vapidKey: import.meta.env.VITE_VAPID_KEY,
              })
                .then((currentToken) => {
                  if (currentToken) {
                    const data = {
                      name: user.displayName,
                      email: user.email,
                      img: user.photoURL,
                      description: "",
                      currentToken: currentToken,
                      id: user.uid,
                      wins: 0,
                      losses: 0,
                      ratio: "1.00",
                    };
                    setUsers([...users, data]);
                    setDoc(doc(db, `users/${user.uid}`), data).then(() => {
                      console.log("sign up och token finns");
                      navigate("/home");
                    });
                  }
                })
                .catch((err) => {
                  console.log("error", err);
                  navigate("/");
                });
            } else {
              const data = {
                name: user.displayName,
                email: user.email,
                img: user.photoURL,
                description: "",
                currentToken: "",
                id: user.uid,
                wins: 0,
                losses: 0,
                ratio: "1.00",
              };
              setUsers([...users, data]);
              setDoc(doc(db, `users/${user.uid}`), data)
                .then(() => {
                  console.log("sign up och token finns inte");
                  navigate("/home");
                })

                .catch((err) => {
                  console.log("error", err);
                  navigate("/");
                });
            }
          }
        });
      })
      .catch((error) => {
        console.log("error", error);
        navigate("/");
      });
  };

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log(user);
      const userRef = doc(db, "users", user.uid);

      getDoc(userRef).then(async (item) => {
        if (!item.data()) {
          if (isNotificationsAllowed && !iphoneCheck) {
            await getToken(messaging, {
              vapidKey: import.meta.env.VITE_VAPID_KEY,
            })
              .then((currentToken) => {
                if (currentToken) {
                  const data = {
                    name: user.displayName,
                    email: user.email,
                    img: user.photoURL,
                    description: "",
                    currentToken: currentToken,
                    id: user.uid,
                    wins: 0,
                    losses: 0,
                    ratio: "1.00",
                  };
                  setUsers([...users, data]);
                  setDoc(doc(db, `users/${user.uid}`), data).then(() => {
                    console.log("sign up och token finns");
                    navigate("/home");
                  });
                }
              })
              .catch((err) => {
                console.log("error", err);
                navigate("/");
              });
          } else {
            const data = {
              name: user.displayName,
              email: user.email,
              img: user.photoURL,
              description: "",
              currentToken: "",
              id: user.uid,
              wins: 0,
              losses: 0,
              ratio: "1.00",
            };
            setUsers([...users, data]);
            setDoc(doc(db, `users/${user.uid}`), data)
              .then(() => {
                console.log("sign up och token finns inte");
                navigate("/home");
              })

              .catch((err) => {
                console.log("error", err);
                navigate("/");
              });
          }
        }
      });
    });
  };

  return (
    <div className="login">
      <h1 className="title">
        Connect
        <br></br>
        to
        <br></br>
        FOOS WARRIORS
      </h1>
      <p className="description">
        {" "}
        To be able to play, you have to login with Microsoft or Google Account
      </p>
      <div className="buttonsContainer">
        <PrimaryButton
          icon={<ICON.Microsoft />}
          title="Microsoft"
          onClick={signInWithMicrosoft}
        />
        <PrimaryButton
          icon={<ICON.Gmail />}
          title="Gmail"
          onClick={signInWithGoogle}
        />
      </div>
    </div>
  );
};
