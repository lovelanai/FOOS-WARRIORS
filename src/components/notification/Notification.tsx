import { onMessageListener, requestForToken } from "@/firebase/messaging";
import { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const Notification = () => {
  const [message, setMessage] = useState({
    title: "",
    body: "",
  });
  const ToastDisplay = () => {
    return (
      <div>
        <p>
          <b>{message?.title}</b>
        </p>
        <p>{message?.body}</p>
      </div>
    );
  };
  const notify = () => toast(<ToastDisplay />);

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
        title: payload?.notificaion?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((error) => console.log("failed", error));
  return <Toaster position="top-center" />;
};
