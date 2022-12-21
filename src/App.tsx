import { Route, Routes } from "react-router-dom";
import { FindPlayers } from "./views/find-players/FindPlayers";
import { Home } from "./views/home/Home";
import { LeaderBoard } from "./views/leader-board/LeaderBoard";
import { LogIn } from "./views/login/LogIn";
import { MatchHistory } from "./views/match-history/MatchHistory";
import { Playground } from "./views/playground/Playground";
import { Profile } from "./views/profile/Profile";
import "./main.sass";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/findPlayers" element={<FindPlayers />} />
        <Route path="/leaderBoard" element={<LeaderBoard />} />
        <Route path="/matchHistory" element={<MatchHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </div>
  );
}

export default App;
