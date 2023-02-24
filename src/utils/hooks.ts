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
  const [response, setResponse] = useState<any[]>([]);
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
          // console.log("usefetch by id", item.data());
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [api, id]);

  return { response, isLoading, setResponse };
};

export const fetchWithMatch = (
  api: string,
  dbValue: string,
  clientValue: string | number | boolean,
  reverse?: boolean
) => {
  const [response, setResponse] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ascref = query(
    collection(db, api),
    where(dbValue, "==", clientValue),
    orderBy("time", "asc")
  );
  const descref = query(
    collection(db, api),
    where(dbValue, "==", clientValue),
    orderBy("time", "desc")
  );

  useEffect(() => {
    getDocs(reverse ? descref : ascref)
      .then((res) => {
        setResponse(
          res.docs.map((item) => {
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
  }, [api, clientValue]);

  return { response, isLoading, setResponse };
};

export const sendWebhookMessage = async (amount: string, user: string) => {
  const webhookUrl = import.meta.env.VITE_TEAMS_WEBHOOK_URL;

  const message = {
    "@type": "MessageCard",
    summary: "New message from your app",
    themeColor: "#ff87dd",
    sections: [
      {
        activityTitle: "INCOMING BATTLE",
        activitySubtitle: `Invite from ${user}`,
        activityImage:
          "https://firebasestorage.googleapis.com/v0/b/fooswarriors-bdc5e.appspot.com/o/swords.png?alt=media&token=fe221e5c-f333-48a0-b562-c8949991aa00",
        facts: [
          {
            name: "Players needed",
            value: `${amount}`,
          },
        ],
        markdown: true,
        text: "First ones to respond gets the spots",
      },
    ],
  };
  const response = await fetch(webhookUrl, {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors",
  });
  console.log(response);
};
