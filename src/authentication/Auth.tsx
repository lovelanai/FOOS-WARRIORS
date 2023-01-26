import { useUser } from "@/context/UserContext";
import { Navigate } from "react-router-dom";

interface AuthProps {
  children: JSX.Element;
}
export const Auth = ({ children }: AuthProps) => {
  const { loggedInUserId } = useUser();
  return loggedInUserId ? children : <Navigate to="/login" />;
};
