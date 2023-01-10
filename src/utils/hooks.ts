import { useUser } from "@/context/UserContext";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "@/firebase/firebase.config.js";
import { getAuth, updateProfile } from "firebase/auth";

export interface MatchProps {
  userID1: string;
  userID2: string; // pinkTeam
  userID3: string;
  userID4: string; // redTeam
  matchWinners: string;
}

/* export const useMatch = async (
  user1: string,
  user2: string,
  user3: string,
  user4: string,
  matchWinners: string
) => {
  if(matchWinners = "redTeam"){
    getDoc(user1, {
      wins,
    });
  }
  }
}; */

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
