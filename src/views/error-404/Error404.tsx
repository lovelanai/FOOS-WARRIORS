import ICON from "@/assets/icons/icons";
import Logo from "@/assets/logos/logos";
import { PrimaryButton } from "@/components/buttons/primary-button/PrimaryButton";
import { Header } from "@/components/header/Header";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import "./Error404.sass";

export const Error404 = () => {
  const { loggedInUserId } = useUser();
  const navigate = useNavigate();
  return (
    <div className="error404">
      <Header
        title="EXCUSE ME IM LOST"
        element={
          <div onClick={() => navigate("/home")}>
            <ICON.Arrow />
          </div>
        }
      />
      <div className="content">
        <div className="banner">
          <h1 className="title">Oops!</h1>
          <h2 className="text">Something went wrong...</h2>
        </div>
        <div className="cubeContainer">
          <div className="cube">
            <div className="top square">
              <Logo.BattleSkull style={{ height: "80%" }} />
            </div>
            <div className="right square">?</div>
            <div className="bottom square"></div>
            <div className="left square">?</div>
            <div className="front square">
              <Logo.PlayerOnField className="icon" style={{ height: "55%" }} />
            </div>
            <div className="back square">
              <Logo.HiQ
                className="icon"
                style={{ transform: "rotate(180deg)", height: "40%" }}
              />
            </div>
          </div>
        </div>
        <div className="nav">
          <h2 className="text">Here are some helpful links:</h2>
          <div className="buttonContainer">
            <PrimaryButton
              title="Home"
              secondary
              onClick={() => navigate("/home")}
            />
            <PrimaryButton
              title="Cheat Codes"
              secondary
              onClick={() =>
                (window.location.href =
                  "https://www.youtube.com/watch?v=dQw4w9WgXcQ")
              }
            />
            <PrimaryButton
              title="Profile"
              secondary
              onClick={() => navigate(`/profile/${loggedInUserId}`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
