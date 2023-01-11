import { useNavigate } from "react-router-dom";
import Logo from "@/assets/logos/logos";
import { PrimaryButton } from "@/components/primary-button/PrimaryButton";
import { useUser } from "@/context/UserContext";
import "./LandingPage.sass";
import { sendMessage } from "@/utils/hooks";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();

  const testMessage = {
    to: "f7IhuiPrpWx7ev9yo2xBaX:APA91bHEtDxR1KLytreym1rziQ-9CTBZBp7RS7zylV-x4AS-Ok74rBVTtGh4yYbZkcB9DKzlrefC8pCGDZxt4Qpkf8h1QL-8U33Z0gtZVnv6rO9NHF91aLb1_ED-OxeSvGjbmw-iEfZF",
    notification: {
      body: "Firebase Cloud Message Body",
      title: "firebase cloud message title",
    },
  };
  const test = () => {
    sendMessage({ body: "hej", title: "tjo" });
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
