import Logo from "@/assets/logos/logos";
import { FrontPageLogo } from "@/components/front-page-logo/FrontPageLogo";
import { Navigation } from "@/components/navigation/Navigation";
import { PrimaryButton } from "@/components/primary-button/PrimaryButton";
import { useUser } from "@/context/UserContext";
import { Link } from "react-router-dom";
import { Startup } from "../startup/Startup";
import "./Home.sass";
export const Home = () => {
  const { isLoggedIn } = useUser();
  return (
    <div className={`home`}>
      <Link className="playground" to="/playground">
        Playground <br />
        {`(dev)`}
      </Link>
      {isLoggedIn ? (
        <>
          <FrontPageLogo />
          <Navigation />
        </>
      ) : (
        <>
          <Startup />
        </>
      )}
    </div>
  );
};
