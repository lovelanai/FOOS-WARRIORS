import { Loader } from "@/components/loader/Loader";
import "./AuthLoader.sass";

export const AuthLoader = () => {
  return (
    <div className="authLoader">
      <Loader />
    </div>
  );
};
