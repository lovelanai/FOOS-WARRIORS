import ICON from "@/assets/icons/icons";
import { GameCard } from "@/components/cards/game-card/GameCard";
import { Header } from "@/components/header/Header";
import { useUser } from "@/context/UserContext";
import { useFetch } from "@/utils/hooks";
import { GameProps } from "@/utils/props";
import { useNavigate, useParams } from "react-router-dom";
import "./TeamGenerator.sass";

export const TeamGenerator = () => {
  const { users } = useUser();
  const navigate = useNavigate();
  const params = useParams();
  const gameId = params.id;
  const { response, isLoading } = useFetch("games", gameId);
  const gameDataArray = response as unknown as GameProps;

  let playersInGame = [] as any;

  if (!isLoading) {
    (response as any)?.players?.forEach((element: any) => {
      playersInGame.push(users.find(({ id }) => id === element));
    });
  }

  return (
    <div className="teamGenerator">
      <Header
        title="Generate Teams"
        element={
          <div onClick={() => navigate("/home")}>
            <ICON.Arrow />
          </div>
        }
      />

      {playersInGame ? (
        <div className="content">
          {playersInGame ? (
            <GameCard host players={playersInGame} id={gameDataArray.id} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
