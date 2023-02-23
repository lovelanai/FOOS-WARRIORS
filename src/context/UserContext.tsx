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
  users: any[];
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;

  isLoading: boolean;
  isInviteView: boolean;
  setIsInviteView: React.Dispatch<React.SetStateAction<boolean>>;
  invitedPlayerId: string;
  setInvitedPlayerId: React.Dispatch<React.SetStateAction<string>>;
  pending: boolean;
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  finished: boolean;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
  error: { title: string; body: string };
  setError: React.Dispatch<
    React.SetStateAction<{ title: string; body: string }>
  >;
}

export const UserContext = createContext<UserContextValue>({
  isLoggedIn: false,
  loggedInUserId: "",
  viewGreetingPage: false,
  setViewGreetingPage: () => undefined,
  isInviteView: false,
  setIsInviteView: () => undefined,
  invitedPlayerId: "",
  setInvitedPlayerId: () => undefined,
  pending: false,
  setPending: () => undefined,
  active: false,
  setActive: () => undefined,
  finished: false,
  setFinished: () => undefined,
  users: [],
  setUsers: () => undefined,
  error: { title: "", body: "" },
  setError: () => undefined,

  isLoading: true,
});

const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [viewGreetingPage, setViewGreetingPage] = useState<boolean>(false);
  const [isInviteView, setIsInviteView] = useState<boolean>(false);
  const [invitedPlayerId, setInvitedPlayerId] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [error, setError] = useState({ title: "", body: "" });

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

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        loggedInUserId,
        viewGreetingPage,
        setViewGreetingPage,
        isInviteView,
        setIsInviteView,
        invitedPlayerId,
        setInvitedPlayerId,
        pending,
        setPending,
        active,
        setActive,
        finished,
        setFinished,
        users,
        setUsers,
        isLoading,
        error,
        setError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUser = () => useContext(UserContext);
