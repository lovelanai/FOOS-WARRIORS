import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface UserContextValue {
  isLoggedIn: boolean;
  viewGreetingPage: boolean;
  setViewGreetingPage: React.Dispatch<React.SetStateAction<boolean>>;
  isMyProfile: boolean;
  setIsMyProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextValue>({
  isLoggedIn: false,
  viewGreetingPage: false,
  setViewGreetingPage: () => undefined,
  isMyProfile: false,
  setIsMyProfile: () => undefined,
});

const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [viewGreetingPage, setViewGreetingPage] = useState<boolean>(false);
  const [isMyProfile, setIsMyProfile] = useState<boolean>(false);

  const UserStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
      getAuth().onAuthStateChanged(function (user) {
        if (user) {
          console.log(user);
          setIsLoggedIn(true);
        } else {
          console.log("ej inloggad");
          setIsLoggedIn(false);
        }
      });
    }, []);
    return { isLoggedIn };
  };

  const { isLoggedIn } = UserStatus();

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        viewGreetingPage,
        setViewGreetingPage,
        isMyProfile,
        setIsMyProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUser = () => useContext(UserContext);
