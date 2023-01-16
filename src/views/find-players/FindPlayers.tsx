import ICON from "@/assets/icons/icons";
import { Header } from "@/components/header/Header";
import { InputField } from "@/components/input-field/InputField";
import { InviteCard } from "@/components/InviteCard/InviteCard";
import { HeaderNotification } from "@/components/notification/HeaderNotification";
import { PlayerCardSkeleton } from "@/components/player-card/player-card-skeleton/PlayerCardSkeleton";
import { PlayerCard } from "@/components/player-card/PlayerCard";
import { useUser } from "@/context/UserContext";
import { db } from "@/firebase/firebase.config";
import { fetchWithMatch, sendNotification, useFetch } from "@/utils/hooks";
import { UserProps } from "@/utils/props";
import { uuidv4 } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindPlayers.sass";

export const FindPlayers = () => {
  const navigate = useNavigate();
  const { loggedInUserId } = useUser();
  const { response, isLoading } = useFetch("users");
  const { response: currentUser } = useFetch("users", "Love Lanai");
  const user = { ...(currentUser as unknown as UserProps) };

  const [invitationMode, setInvitationMode] = useState(false);
  const [name, setName] = useState("");
  const [notificatonToken, setNotificationToken] = useState("");
  const [recieverId, setRecieverId] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleInvitation = (name: string, token: string, id: string) => {
    setInvitationMode(true);
    setName(name);
    setNotificationToken(token);
    setRecieverId(id);
  };

  const handleSendInvite = () => {
    sendNotification({
      to: notificatonToken,
      title: "INCOMING BATTLE",
      body: `${user.name} invited you to play a game of foos!`,
      recieverId: recieverId,
    }).then(() => {
      const id = uuidv4();
      const currentUserRef = doc(db, `notifications/${id}`);
      const day = new Date().toDateString();
      const time = new Date().toLocaleTimeString();
      setDoc(currentUserRef, {
        title: "INCOMING BATTLE",
        text: `${user.name} invited you to play a game of foos!`,
        id: recieverId,
        time: `${day} ${time}`,
      }).catch((err) => {
        console.log("error", err);
      });
    });
  };

  const searchFilter = (user: UserProps) =>
    inputValue === "" ||
    user.name.toLowerCase().includes(inputValue.toLowerCase());

  const removeLoggedInUser = (user: UserProps) => user.id !== loggedInUserId;

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
          asideElement={<HeaderNotification />}
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
        {invitationMode ? (
          <div className="invite-container">
            <InviteCard invitedName={name} onClick={handleSendInvite} />
          </div>
        ) : (
          <></>
        )}

        {response && !isLoading ? (
          <>
            {response
              .filter(searchFilter)
              .filter(removeLoggedInUser)
              .map((user: UserProps) => (
                <PlayerCard
                  profileLink={user.id}
                  title={user.name}
                  img={user.img}
                  key={user.id}
                  inviteOnClick={() =>
                    handleInvitation(user.name, user.currentToken, user.id)
                  }
                />
              ))}
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
