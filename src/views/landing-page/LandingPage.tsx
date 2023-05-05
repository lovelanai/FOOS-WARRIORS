import Logo from "@/assets/logos/logos";
import { PrimaryButton } from "@/components/buttons/primary-button/PrimaryButton";
import { useUser } from "@/context/UserContext";
import { db } from "@/firebase/firebase.config";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./LandingPage.sass";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();

  const deleteCollection = async () => {
    const today = new Date().getDate();
    const collectionRef = query(
      collection(db, "todaysBattles"),
      where("date", "!=", today)
    );
    const data = await getDocs(collectionRef);

    if (data.size) {
      data.forEach((doc) => {
        deleteDoc(doc.ref);
      });
      console.log("Deleted old games");
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
        <h1 className="text">STÄKE</h1>
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
