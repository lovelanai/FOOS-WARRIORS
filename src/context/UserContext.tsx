import { fetchWithMatch, useFetch } from "@/utils/hooks";
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
  users: any[];
  setUsers: React.Dispatch<React.SetStateAction<[]>>;
  notifications: any[];
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextValue>({
  isLoggedIn: false,
  loggedInUserId: "",
  viewGreetingPage: false,
  setViewGreetingPage: () => undefined,
  update: false,
  setUpdate: () => undefined,
  users: [],
  setUsers: () => undefined,
  setNotifications: () => undefined,
  notifications: [],
  isLoading: true,
});

const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [viewGreetingPage, setViewGreetingPage] = useState<boolean>(false);
  const [update, setUpdate] = useState(false);

  const UserStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loggedInUserId, setIsLoggedInUserId] = useState("");

    useEffect(() => {
      getAuth().onAuthStateChanged(function (user) {
        if (user) {
          setIsLoggedIn(true);
          setIsLoggedInUserId(user.uid);
        } else {
          setIsLoggedIn(false);
          setIsLoggedInUserId("");
        }
      });
    }, []);
    return { isLoggedIn, loggedInUserId };
  };

  const { isLoggedIn, loggedInUserId } = UserStatus();

  // global fetch

  const {
    response: users,
    isLoading,
    setResponse: setUsers,
  } = useFetch("users");

  const { response: notifications, setResponse: setNotifications } =
    fetchWithMatch("notifications", "id", loggedInUserId);

  console.log("users", users);
  console.log("notifications", notifications);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        loggedInUserId,
        viewGreetingPage,
        setViewGreetingPage,
        update,
        setUpdate,
        users,
        setUsers,
        isLoading,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUser = () => useContext(UserContext);
