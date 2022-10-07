import { db } from "../firebase";

export const saveSearchHistoryToFirebase = async (user, searchHistory) => {
  if (!user) return;
  try {
    await db
      .collection("users")
      .doc(user?.uid)
      .collection("searchHistory")
      .doc("searchHistoryItems")
      .set({
        basket: searchHistory,
      });
  } catch (error) {
    alert(error);
  }
};
