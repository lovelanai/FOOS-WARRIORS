import { FrontPageLogo } from "@/components/front-page-logo/FrontPageLogo";
import { Navigation } from "@/components/navigation/Navigation";
import "./Home.sass";

export const Home = () => {
  return (
    <div className={`home`}>
      <div className="content">
        <FrontPageLogo />
        <Navigation />
      </div>
    </div>
  );
};
