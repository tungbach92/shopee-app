import React, { useState, useEffect, useContext, useRef } from "react";
import { ProductContext } from "../context";
import { db, storage } from "../firebase";

const AccountContent = () => {
  const { user } = useContext(ProductContext);
  const [userName, setUsetName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [userImageURL, setUserImageURL] = useState();
  const [fileImage, setFileImage] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [uploadProceesing, setUploadProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const inputEl = useRef();

  //free memory file input
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  // set user info from db
  useEffect(() => {
    if (user) {
      const userName = user.displayName;
      const email = user.email;
      setUsetName(userName ? userName : "");
      setEmail(email ? email : "");

      db.collection("users")
        .doc(user?.uid)
        .collection("infos")
        .doc("infoItems")
        .get()
        .then((doc) => {
          if (doc.exists) {
            const name = doc.data().name;
            const gender = doc.data().gender;
            const birthday = doc.data().birthday;
            const phone = doc.data().phone;
            setName(name ? name : "");
            setGender(gender ? gender : "");
            setBirthday(birthday ? birthday : "");
            setPhone(phone ? phone : "");
          }
        })
        .catch((err) => alert(err));

      const storageRef = storage.ref(`users/${user.uid}/avatar`);

      storageRef
        .getDownloadURL()
        .then((userImageURL) => {
          setUserImageURL(userImageURL);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [user, uploadSuccess]); // rerender if upload success

  const limit = (val, max) => {
    if (val.length === 1 && val[0] > max[0]) {
      val = "0" + val;
    }

    if (val.length === 2) {
      if (Number(val) === 0) {
        val = "01";

        //this can happen when user paste number
      } else if (val > max) {
        val = max;
      }
    }

    return val;
  };

  const birthdayCheck = (val) => {
    const month = limit(val.substring(0, 2), "12");
    const date = limit(val.substring(2, 4), "31");

    return month + (date.length ? "/" + date : "");
  };

  const handleImageClick = (e) => {
    inputEl.current.click();
  };

  const handleImageInputChange = (e) => {
    if (uploadProceesing) {
      return;
    }
    if (e.target.files && e.target.files[0]) {
      const fileImage = e.target.files[0];
      setFileImage(fileImage);
      if (fileImage.size > 1048576) {
        alert("File is larger than 1048576. Please try again.");
      } else {
        const previewImage = URL.createObjectURL(fileImage);
        setPreviewImage(previewImage);
        setUploadSuccess(false); // for uploading step
      }
    }
  };

  const handleInfoSubmit = (e) => {
    e.preventDefault();

    if (uploadProceesing) {
      return;
    }

    try {
      user.updateProfile({
        displayName: userName,
        email: email,
      });

      db.collection("users")
        .doc(user?.uid)
        .collection("infos")
        .doc("infoItems")
        .set({
          name: name,
          gender: gender,
          birthday: birthday,
          phone: phone,
        });

      alert("Cập nhật thành công");
    } catch (error) {
      setUploadProcessing(false);
      console.log(error.message);
    }

    if (fileImage && !uploadSuccess) {
      // dont upload if no fileImage or without choose fileImage again
      const storageRef = storage.ref(`users/${user.uid}/avatar`);
      const uploadTask = storageRef.put(fileImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          switch (snapshot.state) {
            case "running":
              console.log("Upload is running");
              setUploadProcessing(true);
              break;
            case "pause":
              setUploadProcessing(false);
              console.log("Upload is paused");
              break;
            default:
              break;
          }
        },
        (error) => {
          setUploadProcessing(false);
          console.log(error.message);
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          // uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          //   console.log("File available at", downloadURL);
          // });
          setUploadProcessing(false);
          setUploadSuccess(true);
          console.log("Upload is success");
        }
      );
    }
  };

  const handlePhoneChange = (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setPhone(e.target.value);
  };
  return (
    <div className="container">
      <div className="grid user-profile">
        <div className="grid__row grid__row--padtb3">
          <div className="grid__col-2x">
            <div className="user-profile__name-container">
              <div className="user-profile__image-container">
                {userImageURL ? (
                  <img
                    className="user-profile__image-user"
                    src={userImageURL}
                    alt="userImg"
                  />
                ) : (
                  <svg
                    enableBackground="new 0 0 15 15"
                    viewBox="0 0 15 15"
                    x="0"
                    y="0"
                    className="user-profile__image-svg"
                  >
                    <g>
                      <circle
                        cx="7.5"
                        cy="4.5"
                        fill="none"
                        r="3.8"
                        strokeMiterlimit="10"
                      ></circle>
                      <path
                        d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6"
                        fill="none"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                      ></path>
                    </g>
                  </svg>
                )}
              </div>
              <div className="user-profile__name">sfsb3fax26</div>

              <div className="user-profile__name-btn">Sửa Hồ Sơ</div>
            </div>
            <div className="user-profile__category">
              <div className="user-profile__my-user">Tài Khoản Của Tôi</div>
              <div className="user-profile__my-info">Hồ sơ</div>
              <div className="user-profile__my-bank">Ngân hàng</div>
              <div className="user-profile__my-adress">Địa chỉ</div>
              <div className="user-profile__change-password">Đổi mật khẩu</div>
              <div className="user-profile__order">Đơn Mua</div>
            </div>
          </div>
          <div className="grid__col-10x">
            <div className="user-profile__title-container">
              <div className="user-profile__title">
                <div className="user-profile__label">Hồ Sơ Của Tôi</div>
                <div className="user-profile__label-detail">
                  Quản lý thông tin hồ sơ để bảo mật tài khoản
                </div>
              </div>
            </div>
            <div className="user-profile__content">
              <form
                className="user-profile__info-input"
                onSubmit={handleInfoSubmit}
              >
                <label className="user-profile__user-label">
                  Tên Đăng Nhập
                </label>
                <input
                  type="text"
                  value={userName}
                  className="user-profile__user-input"
                  onChange={(e) => setUsetName(e.target.value)}
                />
                <label className="user-profile__name-label">Tên</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="user-profile__name-input"
                />
                <label className="user-profile__email-label">Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="user-profile__email-input"
                />
                <label className="user-profile__phone-label">
                  Số Điện Thoại
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="user-profile__phone-input"
                />
                <label className="user-profile__gender-label">Giới Tính</label>
                <div className="user-profile__radio-container">
                  <input
                    type="radio"
                    id="man"
                    name="gender"
                    value="man"
                    checked={gender === "man"}
                    onChange={(e) => setGender(e.target.value)}
                    className="user-profile__man-radio"
                  />
                  <label className="user-profile__man-label">Nam</label>
                  <input
                    type="radio"
                    id="woman"
                    name="gender"
                    value="woman"
                    checked={gender === "woman"}
                    onChange={(e) => setGender(e.target.value)}
                    className="user-profile__woman-radio"
                  />
                  <label className="user-profile__woman-label">Nữ</label>
                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    value="other"
                    checked={gender === "other"}
                    onChange={(e) => setGender(e.target.value)}
                    className="user-profile__other-radio"
                  />
                  <label className="user-profile__man-label">Khác</label>
                </div>
                <label className="user-profile__birthday-label">
                  Ngày Sinh
                </label>
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="user-profile__birthday-input"
                />
                <button
                  className={
                    uploadProceesing
                      ? "btn user-profile__info-submit user-profile__info-submit--disabled"
                      : "btn user-profile__info-submit"
                  }
                >
                  Lưu
                </button>
              </form>
              <div className="user-profile__image-input">
                <div className="user-profile__input-image">
                  {userImageURL && !previewImage ? (
                    <div
                      className="user-profile__user-image"
                      style={{ backgroundImage: `url(${userImageURL})` }}
                    ></div>
                  ) : userImageURL || previewImage ? (
                    <div
                      className="user-profile__preview-image"
                      style={{ backgroundImage: `url(${previewImage})` }}
                    ></div>
                  ) : (
                    <svg
                      enableBackground="new 0 0 15 15"
                      viewBox="0 0 15 15"
                      x="0"
                      y="0"
                      className="user-profile__input-svg"
                    >
                      <g>
                        <circle
                          cx="7.5"
                          cy="4.5"
                          fill="none"
                          r="3.8"
                          strokeMiterlimit="10"
                        ></circle>
                        <path
                          d="m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6"
                          fill="none"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                        ></path>
                      </g>
                    </svg>
                  )}
                </div>
                <button
                  onClick={handleImageClick}
                  className={
                    uploadProceesing
                      ? "btn user-profile__image-btn user-profile__image-btn--disabled "
                      : "btn user-profile__image-btn"
                  }
                >
                  Chọn ảnh
                </button>
                <input
                  type="file"
                  ref={inputEl}
                  onChange={handleImageInputChange}
                  className="user-profile__image-file"
                  accept=".jpg,.jpeg,.png"
                />
                <div className="user-profile__image-size">
                  Dụng lượng file tối đa 1 MB
                </div>
                <div className="user-profile__image-format">
                  Định dạng:.JPEG, .PNG
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountContent;
