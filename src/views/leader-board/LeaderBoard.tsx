import ICON from "@/assets/icons/icons";
import Logo from "@/assets/logos/logos";
import { Header } from "@/components/header/Header";
import { LeaderboardCard } from "@/components/leaderboard-card/LeaderboardCard";
import { HeaderNotification } from "@/components/notification/HeaderNotification";
import { SliderButton } from "@/components/slider-button/SliderButton";
import { useUser } from "@/context/UserContext";
import { UserProps } from "@/utils/props";
import { PlayerCardSkeleton } from "@/views/find-players/skeleton/PlayerCardSkeleton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LeaderBoard.sass";

export const LeaderBoard = () => {
  const navigate = useNavigate();
  const { users, isLoading } = useUser();
  const placementSorter = users.sort((a, b) => a.ratio - b.ratio);
  const [view, setView] = useState(false);

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

  const noGamesPlayedFilter = (user: UserProps) =>
    user.wins !== 0 || user.losses !== 0;

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
              .filter(noGamesPlayedFilter)
              .reverse()
              .map((user: UserProps, index) => {
                return (
                  <LeaderboardCard
                    state={view}
                    title={user.name}
                    img={user.img}
                    key={user.id}
                    placement={index + 1}
                    ratio={user.ratio}
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
