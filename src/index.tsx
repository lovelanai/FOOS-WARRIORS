import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import UserContextProvider from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserContextProvider>
);
