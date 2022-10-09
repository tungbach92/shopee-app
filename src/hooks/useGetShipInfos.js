import { useLayoutEffect, useState } from "react";
import { db } from "../firebase";

const useGetShipInfos = (user) => {
  const [shipInfos, setShipInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

  useLayoutEffect(() => {
    let isMounted = true;
    const shipInfosObserver = db
      .collection("users")
      .doc(user?.uid)
      .collection("shipInfos")
      .doc("shipInfoDoc")
      .onSnapshot(
        (doc) => {
          if (!isMounted) {
            return;
          }
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
    return () => {
      isMounted = false;
      shipInfosObserver();
    };
  }, [user]);

  const updateShipInfoToFirebase = async (shipInfos) => {
    try {
      setUpdateLoading(true);
      const doc = await db
        .collection("users")
        .doc(user?.uid)
        .collection("shipInfos")
        .doc("shipInfoDoc")
        .get();
      if (!doc.exists) {
        await db
          .collection("users")
          .doc(user?.uid)
          .collection("shipInfos")
          .doc("shipInfoDoc")
          .set({ shipInfos: [] });
      } else {
        await db
          .collection("users")
          .doc(user?.uid)
          .collection("shipInfos")
          .doc("shipInfoDoc")
          .update({
            shipInfos: shipInfos,
          });
      }
    } catch (error) {
      alert("Lôi cập nhật địa chỉ ship:" + error.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  return {
    shipInfos,
    setShipInfos,
    shipInfosLoading: loading,
    shipInfosUpdateLoading: updateLoading,
    updateShipInfoToFirebase,
  };
};
export default useGetShipInfos;
