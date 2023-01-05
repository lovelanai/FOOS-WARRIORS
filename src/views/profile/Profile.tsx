import { useState } from "react";
import { Link } from "react-router-dom";
import ICON from "../../assets/icons/icons";
import { useUser } from "../../context/UserContext";
import { mockedUsers } from "../../mockedUsers/mockedUsers";
import { useFetch } from "../../utils/hooks";
import { UserProps } from "../../utils/props";
import "./Profile.sass";

export const Profile = () => {
  const { isMyProfile } = useUser();
  const [isEditMode, setIsEditMode] = useState(false);
  const { loggedInUserId } = useUser();
  const { response } = useFetch("users", loggedInUserId);
  const profileData = { ...(response as unknown as UserProps) };

  return (
    <div className="profile">
      <div className="header">
        <div>
          {isEditMode ? (
            ""
          ) : (
            <Link to="/">
              <ICON.Arrow />
            </Link>
          )}
        </div>
        <div>
          {isEditMode ? (
            <h2 className="title">Edit</h2>
          ) : (
            <h2 className="title">Profile</h2>
          )}
        </div>
        <div></div>
      </div>
      <div className="img-container">
        <div
          className={`img ${isEditMode ? "img--edit" : ""}`}
          style={{
            backgroundImage: "url(assets/404Image.png)",
          }}
        />
      </div>
      <div className="icon-div">
        {/* change to isMyProfile when db is implemented,
        also handle isMyProfile and isEditMode so the camera icon is shown */}
        {!isMyProfile ? (
          <div className="icon" onClick={() => setIsEditMode(true)}>
            <ICON.Pen />
          </div>
        ) : !isMyProfile && isEditMode ? (
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
          <p className="bio">{profileData.desc}</p>
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
            <textarea className="input-bio" defaultValue={profileData.desc} />
          </label>
          <button className="button">Update profile</button>
          <button className="button-exit" onClick={() => setIsEditMode(false)}>
            Exit
          </button>
        </form>
      )}
    </div>
  );
};
