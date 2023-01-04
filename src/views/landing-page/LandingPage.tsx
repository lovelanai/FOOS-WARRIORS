import React from "react";
import "./LandingPage.sass";
import Logo from "../../assets/logos/logos";
import { PrimaryButton } from "../../components/primary-button/PrimaryButton";
import { useUser } from "../../context/UserContext";
import { signInWithMicrosoft } from "../../firebase/microsoftAuth";

export const LandingPage = () => {
  const { setViewGreetingPage, viewGreetingPage } = useUser();
  const login = () => {
    signInWithMicrosoft().then(() => {
      setViewGreetingPage(true);
    });
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
        <PrimaryButton onClick={login} secondary title="Enter Battlefield" />
      </div>
    </div>
  );
};
