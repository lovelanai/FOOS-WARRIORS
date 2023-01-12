import { useNavigate } from "react-router-dom";
import ICON from "@/assets/icons/icons";
import { Header } from "@/components/header/Header";
import { InputField } from "@/components/input-field/InputField";
import { PlayerCardSkeleton } from "@/components/player-card/player-card-skeleton/PlayerCardSkeleton";
import { PlayerCard } from "@/components/player-card/PlayerCard";
import { mockedUsers } from "@/mockedUsers/mockedUsers";
import { useFetch } from "@/utils/hooks";
import { UserProps } from "@/utils/props";
import "./FindPlayers.sass";
import { HeaderNotification } from "@/components/notification/HeaderNotification";

export const FindPlayers = () => {
  const navigate = useNavigate();
  const { response, isLoading } = useFetch("users");
  return (
    <div className="findPlayers">
      <div className="nav">
        <Header
          element={
            <div onClick={() => navigate(-1)}>
              <ICON.Arrow />
            </div>
          }
          title="Find Players"
        asideElement={<HeaderNotification/>}
        />
        <div className="banner">
          <InputField placeholder="Search..." />
        </div>
      </div>
      <div className="content">
        {response && !isLoading ? (
          <>
            {response.map((user: UserProps) => (
              <PlayerCard
                profileLink={user.id}
                title={user.name}
                img={user.img}
                key={user.id}
              />
            ))}

            <PlayerCard title={mockedUsers[0].name} img={mockedUsers[0].img} />
            <PlayerCard title={mockedUsers[1].name} img={mockedUsers[1].img} />
            <PlayerCard title={mockedUsers[2].name} img={mockedUsers[2].img} />
            <PlayerCard title={mockedUsers[3].name} img={mockedUsers[3].img} />
            <PlayerCard title={mockedUsers[4].name} img={mockedUsers[4].img} />
            <PlayerCard title={mockedUsers[5].name} img={mockedUsers[5].img} />
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
