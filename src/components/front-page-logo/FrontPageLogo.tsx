import Logo from "src/assets/logos/logos";
import "./FrontPageLogo.sass";

export const FrontPageLogo = () => {
  return (
    <div className="frontPageLogo">
      <h1 className="text">
        FOOS <br /> WARRIORS
      </h1>
      <Logo.Player className="logo" />
    </div>
  );
};
