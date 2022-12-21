import Logo from "@/assets/logos/logos";
import { PrimaryButton } from "@/components/primary-button/PrimaryButton";
import "./Startup.sass";

export const Startup = () => {
  return (
    <div className="startup">
      <div className="frontPageLogo">
        <Logo.BigPlayer className="logo" />
      </div>
      <div className="title">
        <h1 className="text">FOOS</h1>
        <h1 className="text">WARRIORS</h1>
      </div>
      <div className="aside">
        <PrimaryButton secondary title="Enter Battlefield" />
      </div>
    </div>
  );
};
