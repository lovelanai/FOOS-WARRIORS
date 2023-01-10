import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ICON from "@/assets/icons/icons";
import { Header } from "@/components/header/Header";
import { ImageUploader } from "@/components/image-uploader/ImageUploader";
import { useUser } from "@/context/UserContext";
import { logout } from "@/firebase/authHooks";
import { db, storage } from "@/firebase/firebase.config";
import { useFetch } from "@/utils/hooks";
import { UserProps } from "@/utils/props";
import { ProfileSkeleton } from "./profile-skeleton/ProfileSkeleton";
import "./Profile.sass";
import { uuidv4 } from "@firebase/util";

export const Profile = () => {
  const navigate = useNavigate();

  const { loggedInUserId, fetchUser, setFetchUser } = useUser();

  const params = useParams();
  const id = params.id;
  const { response, isLoading } = useFetch("users", id);

  const profileData = { ...(response as unknown as UserProps) };
  const personalProfileCheck = loggedInUserId === profileData.id;

  const [isEditMode, setIsEditMode] = useState(false);
  const [imageUpload, setImageUpload] = useState();
  const [photoURL, setPhotoURL] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // gets imageUrl to state
  useEffect(() => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `profilePictures/${uuidv4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setPhotoURL(url);
        console.log(url);
      });
    });
  }, [imageUpload]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();
    const userRef = doc(db, `users/${loggedInUserId}`);

    // update img
    if (photoURL) {
      updateProfile(auth.currentUser!, { photoURL: photoURL }).catch(
        (error) => {
          console.error(error.message);
        }
      );
      updateDoc(userRef, {
        img: photoURL,
      });
    }

    // update name
    if (name) {
      updateDoc(userRef, {
        name: name,
      });
    }

    // update description
    if (description) {
      updateDoc(userRef, {
        description: description,
      });
    }
    setFetchUser(!fetchUser);
    setIsEditMode(false);
  };

  const HandleSignOut = () => {
    logout();
    navigate("/");
  };

  console.log("desc", description);

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
                <div className="asideElement" onClick={HandleSignOut}>
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
                    isEditMode
                      ? photoURL
                        ? photoURL
                        : profileData.img
                      : profileData.img
                  })`,
                }}
              />
            </div>
            <div className="icon-div">
              {personalProfileCheck ? (
                <>
                  {!isEditMode ? (
                    <div className="icon" onClick={() => setIsEditMode(true)}>
                      <ICON.Pen />
                    </div>
                  ) : (
                    <div className="icon">
                      <ImageUploader
                        onChange={(e: any) =>
                          setImageUpload(e.currentTarget.files[0])
                        }
                      />
                    </div>
                  )}
                </>
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
              <form className="form" onSubmit={handleSubmit}>
                <label>
                  Name
                  <input
                    className="input-name"
                    type="text"
                    value={name ? name : profileData.name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={name ? name : profileData.name}
                  />
                </label>
                <label>
                  Bio
                  <textarea
                    className="input-bio"
                    value={description ? description : profileData.description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={
                      description ? description : profileData.description
                    }
                  />
                </label>
                <button className="button" type="submit">
                  Update profile
                </button>
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
