import { Route, Routes } from "react-router-dom";
import "./main.sass";
import { FindPlayers } from "./views/find-players/FindPlayers";
import { Home } from "./views/home/Home";
import { LandingPage } from "./views/landing-page/LandingPage";
import { LeaderBoard } from "./views/leader-board/LeaderBoard";
import { LogIn } from "./views/login/LogIn";
import { MatchHistory } from "./views/match-history/MatchHistory";
import { Playground } from "./views/playground/Playground";
import { Profile } from "./views/profile/Profile";
import { Battlefield } from "./views/battlefield/Battlefield";
import { Notification } from "./components/notification/Notification";

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
        <Route path="/profile/:id" element={<Profile />} />

        <Route path="/playground" element={<Playground />} />
      </Routes>
    </div>
  );
}

export default App;
