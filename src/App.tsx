import { Route, Routes } from "react-router-dom";
import { Notification } from "./components/notification/Notification";
import "./main.sass";
import { Battlefield } from "./views/battlefield/Battlefield";
import { FindPlayers } from "./views/find-players/FindPlayers";
import { Home } from "./views/home/Home";
import { LandingPage } from "./views/landing-page/LandingPage";
import { LeaderBoard } from "./views/leader-board/LeaderBoard";
import { LogIn } from "./views/login/LogIn";
import { MatchHistory } from "./views/match-history/MatchHistory";
import { MyGames } from "./views/my-games/MyGames";
import { NotificationsView } from "./views/notifications/NotificationsView";
import { Playground } from "./views/playground/Playground";
import { Profile } from "./views/profile/Profile";

function App() {
  return (
    <div>
      <Notification />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/findPlayers" element={<FindPlayers />} />
        <Route path="/leaderBoard" element={<LeaderBoard />} />
        <Route path="/matchHistory" element={<MatchHistory />} />
        <Route path="/battlefield" element={<Battlefield />} />
        <Route path="/games" element={<MyGames />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/notifications" element={<NotificationsView />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </div>
  );
}

export default App;
