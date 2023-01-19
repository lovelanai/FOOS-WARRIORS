import { useNavigate } from "react-router-dom";
import ICON from "@/assets/icons/icons";
import { Header } from "@/components/header/Header";
import "./LeaderBoard.sass";
import { HeaderNotification } from "@/components/notification/HeaderNotification";
import Logo from "@/assets/logos/logos";
import { useUser } from "@/context/UserContext";
import { PlayerCardSkeleton } from "@/components/player-card/player-card-skeleton/PlayerCardSkeleton";
import { PlayerCard } from "@/components/player-card/PlayerCard";
import { UserProps } from "@/utils/props";
import { LeaderboardCard } from "@/components/leaderboard-card/LeaderboardCard";
import { useState } from "react";
import { SliderButton } from "@/components/slider-button/SliderButton";

export const LeaderBoard = () => {
  const navigate = useNavigate();
  const { users, isLoading } = useUser();
  const placementSorter = users.sort((a, b) => a.ratio - b.ratio);
  const [view, setView] = useState(false);

  // this test ratio. wins + losses = gamesPlayer. wlratio = wins / gamesplayed
  // const gamesPlayed = userData.wins + userData.losses;
  // const wlRatio = (userData.wins / gamesPlayed).toFixed(2);

  const date = new Date();
  const year = date.getFullYear();
  let month;
  switch (date.getMonth()) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
  }

  return (
    <div className="leaderBoard">
      <div className="nav">
        <Header
          element={
            <div onClick={() => navigate(-1)}>
              <ICON.Arrow />
            </div>
          }
          title="Leaderboard"
          asideElement={<HeaderNotification />}
        />
        <div className="banner">
          <Logo.HiQ className="icon" />
        </div>
        <div className="title">
          <p className="text">{month}</p>
          <p className="text">{year}</p>
        </div>
        <div className="buttonContainer">
          <SliderButton
            state={view}
            onClick={() => setView(!view)}
            primary="Ranking"
            secondary="Stats"
          />
        </div>
      </div>
      <div className="content">
        {users && !isLoading ? (
          <>
            {placementSorter
              .reverse()
              // .filter(removeLoggedInUser)
              .map((user: UserProps, index) => {
                const gamesPlayed = user.wins + user.losses;
                const wlRatio = (user.wins / gamesPlayed).toFixed(2);
                return (
                  <LeaderboardCard
                    state={view}
                    title={user.name}
                    img={user.img}
                    key={user.id}
                    placement={index + 1}
                    ratio={wlRatio}
                    wins={user.wins}
                    losses={user.losses}
                    gamesPlayed={user.wins + user.losses}
                  />
                );
              })}
          </>
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
