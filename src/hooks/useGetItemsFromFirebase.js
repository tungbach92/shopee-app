import { useEffect, useState } from "react";
import { db } from "../firebase";

const useGetItemsFromFirebase = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
        alert(error.message);
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
