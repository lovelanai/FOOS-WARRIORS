import { useNavigate } from "react-router-dom";
import ICON from "../../assets/icons/icons";
import Logo from "../../assets/logos/logos";
import { Header } from "../../components/header/Header";
import { mockedUsers } from "../../mockedUsers/mockedUsers";
import { LeaderboardCard } from "../../components/leaderboard-card/leaderboardCard";
import "./LeaderBoard.sass";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const d = new Date();
let month = months[d.getMonth()];
let year = d.getFullYear();
const navigate = useNavigate();

export const Leaderboard = () => {
  return (
    <div className="leaderBoard">
      <Header
        element={
          <div onClick={() => navigate(-1)}>
            <ICON.Arrow />
          </div>
        }
        title="Leaderboard"
      />
      <div className="banner">
        <Logo.HiqLogo />
        <div className="date">
          {month} {year}
        </div>
      </div>

      <div className="content">
        <LeaderboardCard
          title={mockedUsers[0].name}
          img={mockedUsers[0].img}
          rank={1}
        />
        <LeaderboardCard
          title={mockedUsers[1].name}
          img={mockedUsers[1].img}
          rank={2}
        />
        <LeaderboardCard
          title={mockedUsers[2].name}
          img={mockedUsers[2].img}
          rank={3}
        />
        <LeaderboardCard
          title={mockedUsers[3].name}
          img={mockedUsers[3].img}
          rank={4}
        />
        <LeaderboardCard
          title={mockedUsers[4].name}
          img={mockedUsers[4].img}
          rank={5}
        />
        <LeaderboardCard
          title={mockedUsers[5].name}
          img={mockedUsers[5].img}
          rank={6}
        />
      </div>
    </div>
  );
};
