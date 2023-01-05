import { Loader } from "../../../components/loader/Loader";
import "./ProfileSkeleton.sass";
export const ProfileSkeleton = () => {
  return (
    <div className="profileSkeleton">
      <>
        <div className="img-container">
          <div className="img">
            <Loader />
          </div>
        </div>
        <div className="icon-div">
          <div className="icon animation-black"></div>
        </div>

        <div className="info">
          <div className="name animation-black"></div>
          <div className="bio animation-gray"></div>
          <div className="stats">
            <div className="infoContainers">
              <div className="value animation-black"></div>
              <div className="type animation-gray"></div>
            </div>
            <div className="infoContainers">
              <div className="value animation-black"></div>
              <div className="type animation-gray"></div>
            </div>
            <div className="infoContainers">
              <div className="value animation-black"></div>
              <div className="type animation-gray"></div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
