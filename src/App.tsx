import { Route, Routes } from "react-router-dom";
import { Notification } from "./components/notification/Notification";
import "./main.sass";
import { Battlefield } from "./views/battlefield/Battlefield";
import { Error404 } from "./views/error-404/Error404";
import { FindPlayers } from "./views/find-players/FindPlayers";
import { Home } from "./views/home/Home";
import { LandingPage } from "./views/landing-page/LandingPage";
import { LeaderBoard } from "./views/leader-board/LeaderBoard";
import { LogIn } from "./views/login/LogIn";
import { MatchHistory } from "./views/match-history/MatchHistory";
import { Game } from "./views/game/Game";

import { Profile } from "./views/profile/Profile";
import { TeamGenerator } from "./views/team-generator/TeamGenerator";

function App() {
  return (
    <div>
      <Notification />
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/findPlayers" element={<FindPlayers />} />
        <Route path="/leaderBoard" element={<LeaderBoard />} />
        <Route path="/matchHistory" element={<MatchHistory />} />
        <Route path="/battlefield" element={<Battlefield />} />
        <Route path="/games" element={<Game />} />
        <Route path="/teamGenerator/:id" element={<TeamGenerator />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
