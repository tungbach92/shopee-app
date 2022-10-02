import { db } from "../firebase";

const getSearchHistoryFromFirebase = async (user) => {
  let searchHistory = [];
  try {
    const doc = await db
      .collection("users")
      .doc(user?.uid)
      .collection("searchHistory")
      .doc("searchHistoryItems")
      .get();
    if (doc.exists) {
      searchHistory = doc.data().basket;
    }
  } catch (error) {
    alert(error.message);
  }
  return searchHistory;
};
export default getSearchHistoryFromFirebase;
