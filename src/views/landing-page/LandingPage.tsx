import Logo from "@/assets/logos/logos";
import { PrimaryButton } from "@/components/primary-button/PrimaryButton";
import { useUser } from "@/context/UserContext";
import { sendNotification } from "@/utils/hooks";
import { useNavigate } from "react-router-dom";
import "./LandingPage.sass";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();

  const test = () => {
    sendNotification({
      to: "cdGwhGsFKr3KYLrmuu5KMp:APA91bGT0xYjYMvvmjwUssaL69esbXtCqeEDbT54D-2wU6MTYBiILn9-yK5h5B3exLcOy5DLmQoWyDa_g17TPFynMDxcmA3WPUEPDymNy-wikpXEELYzYstQ_Ygfm-umQY3fJPOg8neX",
      body: "hej",
      title: "tjo",
    });
  };

  return (
    <div className="landingPage">
      <div className="frontPageLogo">
        <Logo.BigPlayer className="logo" />
      </div>
      <div className="title">
        <h1 className="text">FOOS</h1>
        <h1 className="text">WARRIORS</h1>
      </div>
      <div className="aside">
        <PrimaryButton
          onClick={() => (isLoggedIn ? navigate("/home") : navigate("logIn"))}
          secondary
          title="Enter Battlefield"
        />
        <PrimaryButton onClick={test} secondary title="Enter Battlefield" />
      </div>
    </div>
  );
};
