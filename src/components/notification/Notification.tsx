import { onMessageListener, requestForToken } from "@/firebase/messaging";
import { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const Notification = () => {
  const [message, setMessage] = useState({
    title: "",
    body: "",
    image: "",
  });
  const ToastDisplay = () => {
    return (
      <div>
        <img src={message?.image} alt="toast-image" />
        <div>
          <p>
            <b>{message?.title}</b>
          </p>
          <p>{message?.body}</p>
        </div>
      </div>
    );
  };
  const notify = () =>
    toast(<ToastDisplay />, {
      duration: 99999999,
      position: "top-center",
    });

  useEffect(() => {
    if (message?.title) {
      notify();
    }
  }, [message]);

  requestForToken();

  onMessageListener()
    .then((payload: any) => {
      console.log(payload);
      setMessage({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
        image: payload?.notification?.image,
      });
    })
    .catch((error) => console.log("failed", error));
  console.log(message);
  return <Toaster />;
};
