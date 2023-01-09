import { useNavigate } from "react-router-dom";
import ICON from "../../assets/icons/icons";
import Logo from "../../assets/logos/logos";
import { Header } from "../../components/header/Header";
import { mockedUsers } from "../../mockedUsers/mockedUsers";
import { LeaderboardCard } from "../../components/leaderboard-card/leaderboardCard";
import "./LeaderBoard.sass";
import React, { useState } from "react";

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

const [sortAcending, setSortAscending] = useState(true);

const sortedUsers = [...mockedUsers].sort((a, b) => {
  if (sortAcending) {
    return a.score - b.score;
  } else {
    return b.score - a.score;
  }
});

export const LeaderBoard = () => {
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
        <button onClick={() => setSortAscending(!sortAcending)}></button>
        {sortedUsers.map((mockedUsers) => (
          <LeaderboardCard
            title={mockedUsers.name}
            img={mockedUsers.img}
            rank={mockedUsers.score}
          />
        ))}
      </div>
    </div>
  );
};
