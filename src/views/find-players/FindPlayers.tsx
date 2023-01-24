import ICON from "@/assets/icons/icons";
import { Header } from "@/components/header/Header";
import { InputField } from "@/components/input-field/InputField";
import { InviteCard } from "@/components/InviteCard/InviteCard";
import { HeaderNotification } from "@/components/notification/HeaderNotification";
import { PlayerCard } from "@/components/player-card/PlayerCard";
import { useUser } from "@/context/UserContext";
import { db } from "@/firebase/firebase.config";
import { sendNotification } from "@/utils/hooks";
import { UserProps } from "@/utils/props";
import { PlayerCardSkeleton } from "@/views/find-players/skeleton/PlayerCardSkeleton";
import { uuidv4 } from "@firebase/util";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FindPlayers.sass";

export const FindPlayers = () => {
  const navigate = useNavigate();
  const { loggedInUserId, users, isLoading } = useUser();
  const currentUser: UserProps = users.find(({ id }) => id === loggedInUserId)!;

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
    const day = new Date().toDateString();
    const time = new Date().toLocaleTimeString();

    const backgroundMessage = {
      to: notificatonToken,
      title: "INCOMING BATTLE",
      body: `${currentUser.name} invited you to play a game of foos!`,
      recieverId: recieverId,
    };

    const clientMessage = {
      title: "INCOMING BATTLE",
      text: `${currentUser.name} invited you to play a game of foos!`,
      id: recieverId,
      time: `${day} ${time}`,
    };

    sendNotification(backgroundMessage).then(() => {
      const id = uuidv4();
      const currentUserRef = doc(db, `notifications/${id}`);
      setDoc(currentUserRef, clientMessage).catch((err) => {
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

        {users && !isLoading ? (
          <>
            {users
              .filter(searchFilter)
              .filter(removeLoggedInUser)
              .map((user: UserProps) => (
                <PlayerCard
                  title={user.name}
                  img={user.img}
                  key={user.id}
                  onClick={() => navigate(`/profile/${user.id}`)}
                  buttonText="View Profile"
                />
              ))}
            {users
              .filter(searchFilter)
              .filter(removeLoggedInUser)
              .map((user: UserProps) => (
                <PlayerCard
                  title={user.name}
                  img={user.img}
                  key={user.id}
                  onClick={() => navigate(`/profile/${user.id}`)}
                  buttonText="View Profile"
                />
              ))}
            {users
              .filter(searchFilter)
              .filter(removeLoggedInUser)
              .map((user: UserProps) => (
                <PlayerCard
                  title={user.name}
                  img={user.img}
                  key={user.id}
                  onClick={() => navigate(`/profile/${user.id}`)}
                  buttonText="View Profile"
                />
              ))}
            {users
              .filter(searchFilter)
              .filter(removeLoggedInUser)
              .map((user: UserProps) => (
                <PlayerCard
                  title={user.name}
                  img={user.img}
                  key={user.id}
                  onClick={() => navigate(`/profile/${user.id}`)}
                  buttonText="View Profile"
                />
              ))}
            {users
              .filter(searchFilter)
              .filter(removeLoggedInUser)
              .map((user: UserProps) => (
                <PlayerCard
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
