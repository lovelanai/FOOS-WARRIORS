import { getAuth } from "firebase/auth";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextValue {
  isLoggedIn: boolean;
  loggedInUserId: string;
  viewGreetingPage: boolean;
  setViewGreetingPage: React.Dispatch<React.SetStateAction<boolean>>;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  isInviteView: boolean,
  setIsInviteView: React.Dispatch<React.SetStateAction<boolean>>;
  invitedPlayerId: string,
  setInvitedPlayerId: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextValue>({
  isLoggedIn: false,
  loggedInUserId: "",
  viewGreetingPage: false,
  setViewGreetingPage: () => undefined,
  update: false,
  setUpdate: () => undefined,
  isInviteView: false,
  setIsInviteView: () => undefined,
  invitedPlayerId: "", 
  setInvitedPlayerId: () => undefined
});

const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [viewGreetingPage, setViewGreetingPage] = useState<boolean>(false);
  const [update, setUpdate] = useState(false);
  const [isInviteView, setIsInviteView] = useState<boolean>(false)
  const [invitedPlayerId, setInvitedPlayerId] = useState<string>("")

  const UserStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loggedInUserId, setIsLoggedInUserId] = useState("");

    useEffect(() => {
      getAuth().onAuthStateChanged(function (user) {
        if (user) {
          // console.log(user);
          setIsLoggedIn(true);
          setIsLoggedInUserId(user.uid);
        } else {
          // console.log("ej inloggad");
          setIsLoggedIn(false);
          setIsLoggedInUserId("");
        }
      });
    }, []);
    return { isLoggedIn, loggedInUserId };
  };

  const { isLoggedIn, loggedInUserId } = UserStatus();

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        loggedInUserId,
        viewGreetingPage,
        setViewGreetingPage,
        update,
        setUpdate,
        isInviteView,
        setIsInviteView,
        invitedPlayerId, 
        setInvitedPlayerId
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUser = () => useContext(UserContext);
