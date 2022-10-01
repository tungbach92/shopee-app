import { useEffect, useState } from "react";
import { db } from "../firebase";
import useGetUserByObserver from "./useGetUserByObserver";

const useGetShipInfos = () => {
  const [shipInfos, setShipInfos] = useState([]);
  const { user } = useGetUserByObserver();

  useEffect(() => {
    const setDefaultShipInfos = (shipInfos) => {
      if (shipInfos.length === 1) {
        shipInfos[0].isDefault = true;
        setShipInfos(shipInfos);
      }
    };
    setDefaultShipInfos(shipInfos);
  }, [shipInfos]);

  useEffect(() => {
    const getShipInfos = () => {
      if (user) {
        db.collection("users")
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
            },
            (err) => alert(err.message)
          );
      }
    };
    getShipInfos();
  }, [user]);

  useEffect(() => {
    const updateShipInfoToFirebase = () => {
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
          });
      }
    };
    updateShipInfoToFirebase();
  }, [shipInfos, user]);

  return { shipInfos, setShipInfos };
};
export default useGetShipInfos;
