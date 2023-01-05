import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ICON from "../../assets/icons/icons";
import { PrimaryButton } from "../../components/primary-button/PrimaryButton";
import { useUser } from "../../context/UserContext";
import { signInWithGoogle } from "../../firebase/googleAuth";
import { signInWithMicrosoft } from "../../firebase/microsoftAuth";
import "./LogIn.sass";

export const LogIn = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    } else return;
  }, [isLoggedIn]);

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
          onClick={() =>
            signInWithMicrosoft()
              .then(() => {
                if (isLoggedIn) {
                  navigate("/home");
                }
              })
              .catch((error) => console.log(error))
          }
        />
        <PrimaryButton
          icon={<ICON.Gmail />}
          title="Gmail"
          onClick={() =>
            signInWithGoogle()
              .then(() => {
                navigate("/home");
              })
              .catch((error) => console.log(error))
          }
        />
      </div>
    </div>
  );
};
