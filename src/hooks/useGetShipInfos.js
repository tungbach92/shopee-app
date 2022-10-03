import { useLayoutEffect, useState } from "react";
import { db } from "../firebase";

const useGetShipInfos = (user) => {
  const [shipInfos, setShipInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
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
          alert("Lỗi lấy địa chỉ ship:" + err.message);
          setLoading(false);
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
          // setShipInfos(shipInfos); // observer auto get shipInfos
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
