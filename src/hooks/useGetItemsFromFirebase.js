import { useLayoutEffect, useState } from "react";
import { db } from "../firebase";

const useGetItemsFromFirebase = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setLoading(true);
    const unsubscribeProductObserver = db.collection("products").onSnapshot(
      (querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setItems(items);
        setLoading(false);
      },
      (error) => {
        alert("Lỗi lấy sản phẩm:" + error.message);
        setLoading(false);
      }
    );
    return () => {
      unsubscribeProductObserver();
    };
  }, []);
  return { items, itemsLoading: loading };
};

export default useGetItemsFromFirebase;
