import { useEffect, useState } from "react";
import { db } from "../firebase";

const useGetOrderItems = (user) => {
  const [orderItems, setOrderItems] = useState([]);
  const resetOrderItems = () => {
    setOrderItems([]);
  };

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        //using onsnapshot for get all updated documents in the collection
        .onSnapshot(
          (snapshot) => {
            setOrderItems(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          },
          (err) => {
            alert(err);
          }
        );
    }
  }, [user]);
  return [orderItems, resetOrderItems];
};
export default useGetOrderItems;
