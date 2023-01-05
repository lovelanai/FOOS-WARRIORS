import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase.config";

export const useFetch = (api: string, id?: string, userId?: string) => {
  const [response, setResponse] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      if (!id) {
        getDocs(collection(db, api)).then((res) => {
          setResponse(
            res.docs.map((item) => {
              return { ...item.data(), id: item.id };
            }) as any
          );
          setIsLoading(false);
        });
      } else {
        const postById = doc(db, api, id);
        getDoc(postById).then((item) => {
          setResponse({ ...item.data(), id: item.id } as any);
        });
        setIsLoading(false);
      }
    }
  }, [api, id, userId]);

  return { response, isLoading };
};
