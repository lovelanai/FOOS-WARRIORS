import "./PlayerFrame.sass";

interface PlayerFrameProps {
  img: string;
  title: string;
}

export const PlayerFrame = ({ img, title }: PlayerFrameProps) => {
  return (
    <div className="playerFrame" style={{ backgroundImage: `url(${img})` }}>
      <div className="overlay">
        <h4 className="name">{title}</h4>
      </div>
    </div>
  );
};
