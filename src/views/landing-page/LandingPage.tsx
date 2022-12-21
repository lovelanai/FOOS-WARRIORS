import "./LandingPage.sass";
import Logo from "@/assets/logos/logos";
import { PrimaryButton } from "@/components/primary-button/PrimaryButton";
import { useUser } from "@/context/UserContext";

export const LandingPage = () => {
  const { setViewGreetingPage, viewGreetingPage } = useUser();
  const test = () => {
    setViewGreetingPage(true);
    console.log("hej");
    console.log(viewGreetingPage);
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
        <PrimaryButton onClick={test} secondary title="Enter Battlefield" />
      </div>
    </div>
  );
};
