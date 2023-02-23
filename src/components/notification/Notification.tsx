import ICON from "@/assets/icons/icons";
import Logo from "@/assets/logos/logos";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ToastContent } from "./toast-content/ToastContent";

export const Notification = () => {
  const { error, setError } = useUser();
  const [message, setMessage] = useState({ title: "", body: "" });
  const ToastDisplay = () => {
    return (
      <ToastContent
        title={message.title}
        body={message.body}
        image={<Logo.BattleSkull className="svg" />}
      />
    );
  };
  const notify = () =>
    toast(<ToastDisplay />, {
      duration: 5000,
      position: "top-center",
      style: {
        color: "#363636",
        background: "#fff",
        margin: 0,
        padding: 0,
        border: "1px solid #fc6464",
      },
    });

  useEffect(() => {
    if (message.body) {
      notify();
    }
  }, [message.title.length, message.body.length]);

  useEffect(() => {
    setMessage(error);
  }, [error.body.length, error.title.length]);

  return <Toaster />;
};
