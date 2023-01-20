import { useState } from "react";

import "./LeaderboardCard.sass";

interface LeaderboardCard {
  title: string;
  img: string;
  id?: string;
  state: boolean;
  onClick?: () => void;
  ratio: number | string;
  placement: number;
  wins: number;
  losses: number;
  gamesPlayed: number;
}

export const LeaderboardCard = ({
  img,
  title,
  ratio,
  placement,
  wins,
  losses,
  gamesPlayed,
  state,
}: LeaderboardCard) => {
  const [view, setView] = useState(false);

  let placementText;
  switch (placement) {
    case 1:
      placementText = "st";
      break;
    case 2:
      placementText = "nd";
      break;
    case 3:
      placementText = "rd";
      break;
    case 22:
      placementText = "nd";
      break;
    case 23:
      placementText = "rd";
      break;
    case 32:
      placementText = "nd";
      break;
    case 33:
      placementText = "rd";
      break;
    case 42:
      placementText = "nd";
      break;
    case 43:
      placementText = "rd";
      break;
    default:
      placementText = "st";
      break;
  }

  console.log(view);

  return (
    <div
      className="leaderboardCard"
      // style={view ? { background: "red" } : {}}
      // onClick={() => setView(!view)}
    >
      <div className="content">
        {!state ? (
          <>
            <div
              className="img"
              style={{
                backgroundImage: `url(${img})`,
              }}
            />
            {placement ? (
              <p className="placement">
                {placement}
                {placementText}
              </p>
            ) : null}
          </>
        ) : (
          <div className="statsContainer">
            <div className="stats">
              <p className="text">Wins: {wins}</p>
              <p className="text">Losses: {losses}</p>
            </div>
            <div className="stats">
              <p className="text">Games: {gamesPlayed}</p>
              <p className="text">Win Ratio: {ratio}</p>
            </div>
          </div>
        )}
      </div>
      <div className="aside">
        <h3 className="title">{title}</h3>
      </div>
    </div>
  );
};
