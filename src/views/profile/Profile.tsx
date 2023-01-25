import ICON from "@/assets/icons/icons";
import { Header } from "@/components/header/Header";
import { ImageUploader } from "@/components/image-uploader/ImageUploader";
import { PrimaryButton } from "@/components/primary-button/PrimaryButton";
import { useUser } from "@/context/UserContext";
import { logout } from "@/firebase/authHooks";
import { db, storage } from "@/firebase/firebase.config";
import { UserProps } from "@/utils/props";
import { uuidv4 } from "@firebase/util";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Profile.sass";
import { ProfileSkeleton } from "./skeleton/ProfileSkeleton";

export const Profile = () => {
  const navigate = useNavigate();
  const { loggedInUserId, users, setUsers, isLoading } = useUser();
  const params = useParams();
  const userId = params.id;

  const userConnectedToProfile: UserProps = users.find(
    ({ id }) => id === userId
  )!;
  const userData = { ...(userConnectedToProfile as unknown as UserProps) };

  const personalProfileCheck = loggedInUserId === userData.id;
  const [isEditMode, setIsEditMode] = useState(false);
  const [imageUpload, setImageUpload] = useState();
  const [photoURL, setPhotoURL] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState(userData.description);

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

    const updatedProfile: any = users.map((item) => {
      if (item.id === loggedInUserId) {
        return {
          ...item,
          name: name ? name : userData.name,
          description: description ? description : userData.description,
          img: photoURL ? photoURL : userData.img,
        };
      } else {
        return item;
      }
    });

    setUsers(updatedProfile);
    setIsEditMode(false);
  };

  const HandleSignOut = () => {
    logout();
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
                        : userData.img
                      : userData.img
                  })`,
                }}
              />
              <div
                className={`imgblur ${isEditMode ? "img--edit" : ""}`}
                style={{
                  backgroundImage: `url(${
                    isEditMode
                      ? photoURL
                        ? photoURL
                        : userData.img
                      : userData.img
                  })`,
                }}
              />
              <div className="iconContainer">
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
                  <></>
                )}
              </div>
            </div>
            {!isEditMode ? (
              <div className="info">
                <h3 className="name">{userData.name}</h3>
                <p className="bio">{userData.description}</p>
                <div className="stats">
                  <div>
                    <p className="value">{userData.wins}</p>
                    <p className="type">Wins</p>
                    <div className="border"></div>
                  </div>
                  <div>
                    <p className="value">{userData.losses}</p>
                    <p className="type">Losses</p>
                    <div className="border"></div>
                  </div>
                  <div>
                    <p className="value">{userData.ratio}</p>
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
                    defaultValue={userData.name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a name"
                  />
                </label>
                <label>
                  Bio
                  <input
                    className="input-bio"
                    defaultValue={userData.description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a description"
                  />
                </label>
                <PrimaryButton title="Update profile" submit />

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
