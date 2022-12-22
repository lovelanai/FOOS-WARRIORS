import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

interface UserContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  viewGreetingPage: boolean;
  setViewGreetingPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextValue>({
  isLoggedIn: false,
  setIsLoggedIn: () => undefined,
  viewGreetingPage: false,
  setViewGreetingPage: () => undefined,
});

const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [viewGreetingPage, setViewGreetingPage] = useState<boolean>(false);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        viewGreetingPage,
        setViewGreetingPage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUser = () => useContext(UserContext);