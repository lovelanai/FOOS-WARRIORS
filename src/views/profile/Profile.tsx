import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ICON from "../../assets/icons/icons";
import { Header } from "../../components/header/Header";
import { useUser } from "../../context/UserContext";
import { HandleSignOut } from "../../firebase/authHooks";
import { useFetch } from "../../utils/hooks";
import { UserProps } from "../../utils/props";
import { ProfileSkeleton } from "./profile-skeleton/ProfileSkeleton";
import "./Profile.sass";

export const Profile = () => {
  const navigate = useNavigate();
  const { loggedInUserId } = useUser();
  const [isEditMode, setIsEditMode] = useState(false);

  const params = useParams();
  const id = params.id;

  const { response, isLoading } = useFetch("users", id);
  const profileData = { ...(response as unknown as UserProps) };

  const personalProfileCheck = loggedInUserId === profileData.id;

  const logout = () => {
    HandleSignOut();
    navigate("/");
  };

  return (
    <>
      <div className="profile">
        <div className="header">
          <Header
            element={
              isEditMode ? (
                <></>
              ) : (
                <div onClick={() => navigate(-1)}>
                  <ICON.Arrow />
                </div>
              )
            }
            title={`${isEditMode ? "Edit" : "Profile"}`}
            asideElement={
              personalProfileCheck ? (
                <div className="asideElement" onClick={logout}>
                  Logout
                  <ICON.Exit />
                </div>
              ) : (
                <></>
              )
            }
          />
        </div>
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <div className="profileContent">
            <div className="img-container">
              <div
                className={`img ${isEditMode ? "img--edit" : ""}`}
                style={{
                  backgroundImage: `url(${
                    profileData.img === null
                      ? "https://firebasestorage.googleapis.com/v0/b/fooswarriors-bdc5e.appspot.com/o/404Image.png?alt=media&token=77da1a91-55bd-47ca-a732-152bf9a4107e"
                      : profileData.img
                  })`,
                }}
              />
            </div>
            <div className="icon-div">
              {/* change to isMyProfile when db is implemented,
        also handle isMyProfile and isEditMode so the camera icon is shown */}
              {personalProfileCheck ? (
                <div className="icon" onClick={() => setIsEditMode(true)}>
                  <ICON.Pen />
                </div>
              ) : personalProfileCheck && isEditMode ? (
                <div className="icon">
                  <ICON.Camera />
                </div>
              ) : (
                <div className="icon">
                  <ICON.Invite />
                </div>
              )}
            </div>
            {!isEditMode ? (
              <div className="info">
                <h3 className="name">{profileData.name}</h3>
                <p className="bio">{profileData.description}</p>
                <div className="stats">
                  <div>
                    <p className="value">26</p>
                    <p className="type">Wins</p>
                    <div className="border"></div>
                  </div>
                  <div>
                    <p className="value">14</p>
                    <p className="type">Losses</p>
                    <div className="border"></div>
                  </div>
                  <div>
                    <p className="value">1.4325</p>
                    <p className="type">Ratio</p>
                    <div className="border"></div>
                  </div>
                </div>
              </div>
            ) : (
              <form className="form">
                <label>
                  Name
                  <input
                    className="input-name"
                    type="text"
                    defaultValue={profileData.name}
                  />
                </label>
                <label>
                  Bio
                  <textarea
                    className="input-bio"
                    defaultValue={profileData.description}
                  />
                </label>
                <button className="button">Update profile</button>
                <button
                  className="button-exit"
                  onClick={() => setIsEditMode(false)}
                >
                  Exit
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
};
