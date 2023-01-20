import Logo from "@/assets/logos/logos";
import { PrimaryButton } from "@/components/primary-button/PrimaryButton";
import { useUser } from "@/context/UserContext";
import { db } from "@/firebase/firebase.config";
import {
  query,
  collection,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./LandingPage.sass";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();

  const deleteCollection = async () => {
    const today = new Date().getDate();
    const collectionRef = query(
      collection(db, "matchHistory"),
      where("date", "!=", today)
    );
    const data = await getDocs(collectionRef);

    if (data.size) {
      data.forEach((doc) => {
        deleteDoc(doc.ref);
      });
      console.log("Deleted old games");
    } else {
      console.log("Todays games is up to date");
    }
    return;
  };

  deleteCollection();

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
