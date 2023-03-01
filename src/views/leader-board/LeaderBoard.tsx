import ICON from "@/assets/icons/icons";
import { SliderButton } from "@/components/buttons/slider-button/SliderButton";
import { LeaderboardCard } from "@/components/cards/leaderboard-card/LeaderboardCard";
import { Header } from "@/components/header/Header";

import { useUser } from "@/context/UserContext";
import { UserProps } from "@/utils/props";
import { PlayerCardSkeleton } from "@/views/find-players/skeleton/PlayerCardSkeleton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LeaderBoard.sass";

import { db } from "@/firebase/firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import Countdown from "./CountDown";
import { useFetch } from "@/utils/hooks";
import Logo from "@/assets/logos/logos";

export const LeaderBoard = () => {
  const navigate = useNavigate();

  const { response: users, isLoading } = useFetch("users");

  const [view, setView] = useState(false);

  const [showInfo, setShowInfo] = useState(false);

  const [reset, setReset] = useState(false);

  const placementSorter = users?.sort((a, b) => b.score - a.score);

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

  const deleteFieldValue = async () => {
    for (const user of users) {
      const ref = doc(db, `users/${user.id}`);
      await updateDoc(ref, {
        losses: 0,
        wins: 0,
        ratio: "0.00",
        score: 0,
      });
    }
  };

  useEffect(() => {
    if (date.getDate() === 1) {
      deleteFieldValue();
      setReset(true);
    }
  }, [users]);

  return (
    <div className="leaderBoard">
      <div className="nav">
        <Header
          element={
            <div onClick={() => navigate("/home")}>
              <ICON.Arrow />
            </div>
          }
          title="Leaderboard"
          asideElement={
            showInfo ? (
              <></>
            ) : (
              <div onClick={() => setShowInfo(!showInfo)}>Info</div>
            )
          }
        />
        {showInfo ? (
          <>
            <div className="title">
              <p className="text">Info</p>
            </div>
            <p className="reset-text">1 Win = 3p</p>
            <p className="reset-text">1 Loss = -2p</p>
            <p className="reset-text">
              all stats will reset at the start of the month
            </p>

            <p
              onClick={() => setShowInfo(!showInfo)}
              className="reset-text -cancel"
            >
              close info
            </p>
          </>
        ) : (
          <>
            <div className="title">
              <p className="text">{month}</p>
              <p className="text">{year}</p>
            </div>
            <p className="reset-text">Resets in</p>
            <div className="timer">
              <br></br>
              <br></br>
              <Countdown />
            </div>
            <div className="buttonContainer">
              <SliderButton
                state={view}
                onClick={() => setView(!view)}
                primary="Ranking"
                secondary="Stats"
              />
            </div>
          </>
        )}
      </div>
      <div className="content">
        {reset ? (
          <div className="reset-message">
            <Logo.BattleSkull />
            <h3>
              Leaderboard is preparing for a new battle-period. <br /> Today you
              can warm up until the battles begin again tomorrow!
            </h3>
          </div>
        ) : (
          <>
            {users && !isLoading ? (
              <>
                {placementSorter
                  .filter(noGamesPlayedFilter)

                  .map((user: UserProps, index) => {
                    return (
                      <LeaderboardCard
                        state={view}
                        title={user.name}
                        score={user.score}
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
          </>
        )}
      </div>
    </div>
  );
};
