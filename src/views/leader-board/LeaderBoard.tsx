import { useNavigate } from "react-router-dom";
import ICON from "../../assets/icons/icons";
import Logo from "../../assets/logos/logos";
import { Header } from "../../components/header/Header";
import { mockedUsers } from "../../mockedUsers/mockedUsers";
import { LeaderboardCard } from "../../components/leaderboard-card/leaderboardCard";
import "./LeaderBoard.sass";
import React, { useState, useEffect} from "react";
import { useFetch } from "../../utils/hooks";
import { UserProps } from "../../utils/props";
import { PlayerCardSkeleton } from "../../components/player-card/player-card-skeleton/PlayerCardSkeleton";

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

export const LeaderBoard = () => {
  const navigate = useNavigate();

  const [sortAcending, setSortAscending] = useState(true);

  const { response, isLoading } = useFetch("users");

  const sortedUsers = [response].sort((a, b) => {
    let aScore = (a.wins / a.losses)
    let bScore = (b.wins / b.losses)
    if (sortAcending) {
      return aScore - bScore;
    } else {
      return bScore - aScore;
    }
  });

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
        <button onClick={() => setSortAscending(!sortAcending)}>
          Change order
        </button>
        {response && !isLoading ? (
          {sortedUsers.map((user: UserProps) => (
                    <div key={user.name}>
                      <LeaderboardCard
                        profileLink={user.id}
                        title={user.name}
                        img={user.img}
                        wins={user.wins}
                        losses={user.losses}
                        key={user.id}
                      />
                  </>
        ))}
        ) : (
          <>
            {Array(6)
              .fill(null)
              .map((key, index) => (
                <PlayerCardSkeleton key={index} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};
