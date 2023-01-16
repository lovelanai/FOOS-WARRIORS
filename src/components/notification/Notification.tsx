import { useUser } from "@/context/UserContext";
import { onMessageListener, requestForToken } from "@/firebase/messaging";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ToastContent } from "./toast-content/ToastContent";

export const Notification = () => {
  const { update, setUpdate } = useUser();
  const [message, setMessage] = useState({
    title: "",
    body: "",
    image: "",
  });
  const ToastDisplay = () => {
    return (
      <ToastContent
        image={message?.image}
        title={message?.title}
        body={message?.body}
      />
    );
  };
  const notify = () =>
    toast(<ToastDisplay />, {
      duration: 3000,
      position: "top-center",
      style: {
        color: "#363636",
        background: "#fff",
        margin: 0,
        padding: 0,
      },
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

      setUpdate(!update);
    })
    .catch((error) => console.log("failed", error));
  return <Toaster />;
};
