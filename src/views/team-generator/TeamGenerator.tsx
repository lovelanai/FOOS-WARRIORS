import ICON from "@/assets/icons/icons";
import { Header } from "@/components/header/Header";
import { MyGameCard } from "@/components/my-games/MyGameCard";
import { useFetch } from "@/utils/hooks";
import { GameProps } from "@/utils/props";
import { useNavigate, useParams } from "react-router-dom";
import "./TeamGenerator.sass";

export const TeamGenerator = () => {
  const navigate = useNavigate();
  const params = useParams();
  const gameId = params.id;
  const { response, isLoading } = useFetch("games", gameId);
  const gameDataArray = response as unknown as GameProps;

  console.log(gameDataArray.players);
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

      {response && !isLoading ? (
        <div className="content">
          <MyGameCard players={gameDataArray.players} id={gameDataArray.id} />
        </div>
      ) : null}
    </div>
  );
};
