import { useEffect } from "react";
import { storage } from "../firebase";

const useCheckPhotoURL = (user) => {
  useEffect(() => {
    if (user) {
      const path = `users/${user.uid}/avatar`;
      const storageRef = storage.ref(path);

      storageRef
        .getDownloadURL()
        .then((photoURL) => {
          user.updateProfile({
            photoURL,
          });
        })
        .catch((error) => {
          // 404
          user.updateProfile({
            photoURL: null,
          });
        });
    }
  }, [user]);
};

export default useCheckPhotoURL;
