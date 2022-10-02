import { useEffect, useState } from "react";
import { db } from "../firebase";
import useGetUserByObserver from "./useGetUserByObserver";

const useGetShipInfos = (user) => {
  const [shipInfos, setShipInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const shipInfosObserver = db
      .collection("users")
      .doc(user?.uid)
      .collection("shipInfos")
      .doc("shipInfoDoc")
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            const shipInfos = doc.data().shipInfos;
            setShipInfos(shipInfos);
          } else {
            setShipInfos([]);
          }
          setLoading(false);
        },
        (err) => {
          alert(err.message);
          setLoading(false);
        },
        () => {
          console.log("stop listen");
        }
      );
    return shipInfosObserver;
  }, [user]);

  const updateShipInfoToFirebase = (shipInfos) => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("shipInfos")
        .doc("shipInfoDoc")
        .get()
        .then((doc) => {
          if (!doc.exists) {
            db.collection("users")
              .doc(user?.uid)
              .collection("shipInfos")
              .doc("shipInfoDoc")
              .set({ shipInfos: [] });
          }
        })
        .then(() => {
          db.collection("users")
            .doc(user?.uid)
            .collection("shipInfos")
            .doc("shipInfoDoc")
            .update({
              shipInfos: shipInfos,
            });
        })
        .then(() => {
          setShipInfos(shipInfos);
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return {
    shipInfos,
    setShipInfos,
    shipInfosLoading: loading,
    updateShipInfoToFirebase,
  };
};
export default useGetShipInfos;
