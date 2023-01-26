import { Route, Routes } from "react-router-dom";
import { Auth } from "./authentication/Auth";
import { AuthLoader } from "./authentication/AuthLoader";
import { Notification } from "./components/notification/Notification";
import { useUser } from "./context/UserContext";
import "./main.sass";
import { Battlefield } from "./views/battlefield/Battlefield";
import { Error404 } from "./views/error-404/Error404";
import { FindPlayers } from "./views/find-players/FindPlayers";
import { Game } from "./views/game/Game";
import { Home } from "./views/home/Home";
import { LandingPage } from "./views/landing-page/LandingPage";
import { LeaderBoard } from "./views/leader-board/LeaderBoard";
import { LogIn } from "./views/login/LogIn";
import { MatchHistory } from "./views/match-history/MatchHistory";
import { NotificationsView } from "./views/notifications/NotificationsView";
import { Profile } from "./views/profile/Profile";
import { TeamGenerator } from "./views/team-generator/TeamGenerator";

function App() {
  const { authLoading } = useUser();
  return (
    <div>
      <Notification />
      {authLoading ? (
        <AuthLoader />
      ) : (
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Auth children={<Home />} />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route
            path="/findPlayers"
            element={<Auth children={<FindPlayers />} />}
          />
          <Route
            path="/leaderBoard"
            element={<Auth children={<LeaderBoard />} />}
          />
          <Route
            path="/matchHistory"
            element={<Auth children={<MatchHistory />} />}
          />
          <Route
            path="/battlefield"
            element={<Auth children={<Battlefield />} />}
          />
          <Route path="/games" element={<Auth children={<Game />} />} />
          <Route
            path="/teamGenerator/:id"
            element={<Auth children={<TeamGenerator />} />}
          />
          <Route
            path="/profile/:id"
            element={<Auth children={<Profile />} />}
          />
          <Route
            path="/notifications"
            element={<Auth children={<NotificationsView />} />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
