import { MessageProps } from "./props";
import { useUser } from "@/context/UserContext";
import { db } from "@/firebase/firebase.config.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const useFetch = (api: string, id?: string) => {
  const { update } = useUser();
  const [response, setResponse] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      getDocs(collection(db, api))
        .then((res) => {
          setResponse(
            res.docs.map((item) => {
              return { ...item.data(), id: item.id };
            }) as any
          );
          console.log("usefetch", res);
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      const fetchById = doc(db, api, id);
      getDoc(fetchById)
        .then((item) => {
          setResponse({ ...item.data(), id: item.id } as any);
          console.log("usefetch by id", item.data());
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [api, id, update]);

  return { response, isLoading, setResponse };
};
export const fetchWithMatch = (
  api: string,
  dbValue: string,
  clientValue: string
) => {
  const [response, setResponse] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ref = query(
    collection(db, api),
    where(dbValue, "==", clientValue),
    orderBy("time", "asc")
  );
  const notificationRef = query(
    collection(db, api),
    where(dbValue, "==", clientValue),
    orderBy("time", "asc")
  );

  useEffect(() => {
    getDocs(api === "notifications" ? notificationRef : ref)
      .then((res) => {
        setResponse(
          res.docs.map((item) => {
            return { ...item.data(), id: item.id };
          }) as any
        );
        console.log("fetchwithmatch", res);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [api, clientValue]);

  return { response, isLoading, setResponse };
};

export const sendNotification = async ({ to, body, title }: MessageProps) => {
  try {
    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      body: JSON.stringify({
        to: to,
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
