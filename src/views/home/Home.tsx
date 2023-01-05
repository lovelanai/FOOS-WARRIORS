import { Link } from "react-router-dom";
import { FrontPageLogo } from "../../components/front-page-logo/FrontPageLogo";
import { Navigation } from "../../components/navigation/Navigation";
import { useUser } from "../../context/UserContext";
import { LandingPage } from "../landing-page/LandingPage";
import { LogIn } from "../login/LogIn";
import "./Home.sass";

export const Home = () => {
  const { isLoggedIn } = useUser();

  return (
    <div className={`home`}>
      <Link className="playground" to="/playground">
        Playground <br />
        {`(dev)`}
      </Link>
      <FrontPageLogo />
      <Navigation />
    </div>
  );
};
