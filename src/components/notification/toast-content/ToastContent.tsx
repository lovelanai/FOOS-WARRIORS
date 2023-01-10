import "./ToastContent.sass";

interface ToastContentProps {
  title: string;
  body: string;
  image: string;
}

export const ToastContent = ({ title, body, image }: ToastContentProps) => {
  return (
    <div className="toastContent">
      <div className="image">
        <img src={image} alt="toast-image" />
      </div>
      <div className="text">
        <p className="title">
          <b>{title}</b>
        </p>
        <p className="body">{body}</p>
      </div>
    </div>
  );
};
