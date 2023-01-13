import { getAuth } from "firebase/auth";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

/* type Notification = {
  message: string
  date: string,
} */
interface UserContextValue {
  isLoggedIn: boolean;
  loggedInUserId: string;
  viewGreetingPage: boolean;
  setViewGreetingPage: React.Dispatch<React.SetStateAction<boolean>>;
  fetchUser: boolean;
  setFetchUser: React.Dispatch<React.SetStateAction<boolean>>;
  /* setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  notifications: Notification[]; */
}

export const UserContext = createContext<UserContextValue>({
  isLoggedIn: false,
  loggedInUserId: "",
  viewGreetingPage: false,
  setViewGreetingPage: () => undefined,
  fetchUser: false,
  setFetchUser: () => undefined,
  /* notifications: [],
  setNotifications: () => undefined */
});

const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [viewGreetingPage, setViewGreetingPage] = useState<boolean>(false);
  const [fetchUser, setFetchUser] = useState(false);
  //const [notifications, setNotifications] = useState<Notification[]>([])

  const UserStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loggedInUserId, setIsLoggedInUserId] = useState("");

    useEffect(() => {
      getAuth().onAuthStateChanged(function (user) {
        if (user) {
          console.log(user);
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
        fetchUser,
        setFetchUser,
        /* notifications,
        setNotifications */
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUser = () => useContext(UserContext);
