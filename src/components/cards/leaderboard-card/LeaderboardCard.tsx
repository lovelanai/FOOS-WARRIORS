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
  score?: number;
}

export const LeaderboardCard = ({
  id,
  img,
  title,
  ratio,
  placement,
  wins,
  losses,
  gamesPlayed,
  state,
  score,
}: LeaderboardCard) => {
  const winner = id === "6qe9o1NpaebPn5rgjdYQsTIl6U43";

  const nthNumber = (number: number) => {
    if (number > 3 && number < 21) return `${number}th`;
    switch (number % 10) {
      case 1:
        return `${number}st`;
      case 2:
        return `${number}nd`;
      case 3:
        return `${number}rd`;
      default:
        return `${number}th`;
    }
  };

  return (
    <div className={`leaderboardCard ${winner ? "-winner" : ""}`}>
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
              <p className="placement">{nthNumber(placement)}</p>
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
        <h3 className="title">{winner ? `♛ ${title} ♛` : title}</h3>

        <p className="text">Points: {score}</p>
      </div>
    </div>
  );
};
