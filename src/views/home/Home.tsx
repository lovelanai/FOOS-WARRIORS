import { FrontPageLogo } from "@/components/front-page-logo/FrontPageLogo";
import { Navigation } from "@/components/navigation/Navigation";
import { Link } from "react-router-dom";
import "./Home.sass";

export const Home = () => {
  return (
    <div className={`home`}>
      <Link className="playground" to="/playground">
        Playground <br />
        {`(dev)`}
      </Link>
      <div className="content">
        <FrontPageLogo />
        <Navigation />
      </div>
    </div>
  );
};
