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
import { useState } from "react";
import { InviteCard } from "@/components/InviteCard/InviteCard";
import { UserContext } from "@/context/UserContext";
import { stripBasename } from "@remix-run/router";

export const FindPlayers = () => {
  const navigate = useNavigate();
  const { response, isLoading } = useFetch("users");
  const [invitationMode, setInvitationMode] = useState(false)
  const [name, setName] = useState('')
 
const handleInvitation = (name: string) => {
  setInvitationMode(true)
  setName(name)
}
  
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
        />
        <div className="banner">
          <InputField placeholder="Search..." />
        </div>
      </div>
      <div className="content">
        {invitationMode ? ( 
        <div className="invite-container"><InviteCard
       invitedName={name}
        /></div>) : <></>}
       
        {response && !isLoading ? (
          <>
            {response.map((user: UserProps) => (
              <PlayerCard
                profileLink={user.id}
                title={user.name}
                img={user.img}
                key={user.id}
                inviteOnClick={ () => handleInvitation(user.name)}
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
