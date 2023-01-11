import { useUser } from "@/context/UserContext";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "@/firebase/firebase.config.js";

export const useFetch = (api: string, id?: string, userId?: string) => {
  const { fetchUser } = useUser();
  const [response, setResponse] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      if (!id) {
        getDocs(collection(db, api))
          .then((res) => {
            setResponse(
              res.docs.map((item) => {
                console.log(item.data());
                return { ...item.data(), id: item.id };
              }) as any
            );
          })
          .then(() => {
            setIsLoading(false);
          })
          .catch((error) => {
            console.log("error", error);
          });
      } else {
        const postById = doc(db, api, id);
        getDoc(postById)
          .then((item) => {
            setResponse({ ...item.data(), id: item.id } as any);
            console.log(item.data());
          })
          .then(() => {
            setIsLoading(false);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    }
  }, [api, id, userId, fetchUser]);

  return { response, isLoading };
};

interface MessageProps {
  body: string;
  title: string;
}

export const sendMessage = async ({ body, title }: MessageProps) => {
  try {
    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      body: JSON.stringify({
        to: "f7IhuiPrpWx7ev9yo2xBaX:APA91bHEtDxR1KLytreym1rziQ-9CTBZBp7RS7zylV-x4AS-Ok74rBVTtGh4yYbZkcB9DKzlrefC8pCGDZxt4Qpkf8h1QL-8U33Z0gtZVnv6rO9NHF91aLb1_ED-OxeSvGjbmw-iEfZF",
        notification: {
          body: body,
          title: title,
          image:
            "https://firebasestorage.googleapis.com/v0/b/fooswarriors-bdc5e.appspot.com/o/Logo512.png?alt=media&token=204a88c6-651f-42e7-8fd3-7782af799c38",
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "key=AAAALB8TIAw:APA91bEnaOmac-vjC-UzV9IMUq4miRuombGUCEMVjeghbI9LNCaN2YzW2ONZZ2hgPYzizptOPhHUjsvf37-0kEKPWEiNCHCCn7VEFLn-qWqzkmHMlRUfE5HBgHIjkb_u96pi4QuAXKlN",
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("result is: ", JSON.stringify(result));
  } catch (error) {
    if (error instanceof Error) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
