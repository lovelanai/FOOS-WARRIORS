import Logo from "@/assets/logos/logos";
import { PrimaryButton } from "@/components/primary-button/PrimaryButton";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import "./LandingPage.sass";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();

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
      </div>
    </div>
  );
};
