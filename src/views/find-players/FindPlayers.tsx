import ICON from "@/assets/icons/icons";
import { PlayerCard } from "@/components/cards/player-card/PlayerCard";
import { Header } from "@/components/header/Header";
import { InputField } from "@/components/input/input-field/InputField";
import { useUser } from "@/context/UserContext";
import { UserProps } from "@/utils/props";
import { PlayerCardSkeleton } from "@/views/find-players/skeleton/PlayerCardSkeleton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindPlayers.sass";

export const FindPlayers = () => {
  const navigate = useNavigate();
  const { loggedInUserId, users, isLoading } = useUser();

  const [inputValue, setInputValue] = useState("");

  const searchFilter = (user: UserProps) =>
    inputValue === "" ||
    user.name.toLowerCase().includes(inputValue.toLowerCase());
  const removeLoggedInUser = (user: UserProps) => user.id !== loggedInUserId;

  return (
    <div className="findPlayers">
      <div className="nav">
        <Header
          element={
            <div onClick={() => navigate("/home")}>
              <ICON.Arrow />
            </div>
          }
          title="Find Players"
        />
        <div className="banner">
          <InputField
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="content">
        {users && !isLoading ? (
          <>
            {users
              .filter(searchFilter)
              .filter(removeLoggedInUser)
              .map((user: UserProps) => (
                <PlayerCard
                  id={user.id}
                  title={user.name}
                  img={user.img}
                  key={user.id}
                  onClick={() => navigate(`/profile/${user.id}`)}
                  buttonText="View Profile"
                />
              ))}
          </>
        ) : (
          <>
            {Array(10)
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
