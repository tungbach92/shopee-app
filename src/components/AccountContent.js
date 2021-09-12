import React, { useState, useEffect, useContext, useRef } from "react";
import { ProductContext } from "../context";
import { auth, db, storage } from "../firebase";
import { Link, Switch, Route, Redirect, useLocation } from "react-router-dom";
import PopupModal from "./PopupModal";
import useModal from "../hooks/useModal";
import EmailSmallContent from "./EmailSmallContent";
import PasswordSmallContent from "./PasswordSmallContent";
import AddressSmallContent from "./AddressSmallContent";
import PaymentSmallContent from "./PaymentSmallContent";
import OrderSmallContent from "./OrderSmallContent";

const AccountContent = ({ isAccountPage }) => {
  const { user, userAvatar, setUserAvatar, loading, setLoading } = useContext(ProductContext);
  const [userName, setUsetName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [fileImage, setFileImage] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [uploadProceesing, setUploadProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isAnyUserInfoUpdateFail, setIsAnyUserInfoUpdateFail] = useState(false);
  const [category, setCategory] = useState("profile");
  const inputEl = useRef();
  const location = useLocation();
  const { isPopupShowing, togglePopup } = useModal();

  useEffect(() => {
    let category;
    if (location.pathname.includes("profile")) {
      category = "profile";
      setCategory(category);
    } else if (location.pathname.includes("payment")) {
      category = "payment";
    } else if (location.pathname.includes("address")) {
      category = "address";
    } else if (location.pathname.includes("password")) {
      category = "password";
    } else if (location.pathname.includes("purchase")) {
      category = "purchase";
    }
    setCategory(category);
  }, [location]);

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
    }
  }, [user]); // rerender if upload success

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
    togglePopup(!isPopupShowing);
    if (uploadProceesing) {
      return;
    }

    user
      .updateProfile({
        displayName: userName,
      })
      .then(() => {
        //success
      })
      .catch((err) => {
        console.log(err);
        setIsAnyUserInfoUpdateFail(true);
        return;
      });

    try {
      db.collection("users")
        .doc(user?.uid)
        .collection("infos")
        .doc("infoItems")
        .update({
          name: name,
          gender: gender,
          birthday: birthday,
          phone: phone,
        });
    } catch (error) {
      console.log(error.message);
      setIsAnyUserInfoUpdateFail(true);
      return;
    }

    if (fileImage) {
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
          setIsAnyUserInfoUpdateFail(true);
          console.log(error.message);
          return;
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              setLoading(true);
              user
                .updateProfile({
                  photoURL: downloadURL,
                })
                .then(() => {
                  // set userAvatar
                  setUserAvatar();
                  setLoading(false);
                })
                .catch((error) => {
                  console.log(error);
                  setIsAnyUserInfoUpdateFail(true);
                  return;
                });
            })
            .catch((error) => {
              console.log(error);
              setIsAnyUserInfoUpdateFail(true);
              return;
            });
          setUploadProcessing(false);
          setUploadSuccess(true);
          console.log("Upload is success");
        }
      );
    }
    // alert("Cập nhật thành công");
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
                {userAvatar && !loading ? (
                  <img
                    className="user-profile__image-user"
                    src={userAvatar}
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

              <Link
                to="/user/account/profile"
                className="user-profile__name-btn"
              >
                Sửa Hồ Sơ
              </Link>
            </div>
            <div className="user-profile__category">
              {/* <div className="user-profile__my-user">Tài Khoản Của Tôi</div> */}
              <Link
                to="/user/account/"
                className={
                  category === "profile"
                    ? "user-profile__my-info user-profile__category-item--active"
                    : "user-profile__my-info"
                }
              >
                Hồ sơ
              </Link>
              <Link
                to="/user/account/payment"
                className={
                  category === "payment"
                    ? "user-profile__my-bank user-profile__category-item--active"
                    : "user-profile__my-bank"
                }
              >
                Ngân hàng
              </Link>
              <Link
                to="/user/account/address"
                className={
                  category === "address"
                    ? "user-profile__my-adress user-profile__category-item--active"
                    : "user-profile__my-adress"
                }
              >
                Địa chỉ
              </Link>
              <Link
                to="/user/account/password"
                className={
                  category === "password"
                    ? "user-profile__change-password user-profile__category-item--active"
                    : "user-profile__change-password"
                }
              >
                Đổi mật khẩu
              </Link>
              <Link
                to="/user/purchase"
                className={
                  category === "purchase"
                    ? "user-profile__order user-profile__category-item--active"
                    : "user-profile__order"
                }
              >
                Đơn Mua
              </Link>
            </div>
          </div>
          <div className="grid__col-10x">
            <Switch>
              <Route exact path="/user/account/profile">
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
                    <div className="user-profile__email-input">
                      {email}
                      <Link
                        to="/user/account/email"
                        className="user-profile__email-btn"
                      >
                        Thay đổi
                      </Link>
                    </div>

                    <label className="user-profile__phone-label">
                      Số Điện Thoại
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={handlePhoneChange}
                      className="user-profile__phone-input"
                    />
                    <label className="user-profile__gender-label">
                      Giới Tính
                    </label>
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
                    {isPopupShowing && (
                      <PopupModal
                        isAnyUserInfoUpdateFail={isAnyUserInfoUpdateFail}
                        isAccountPage={isAccountPage}
                        isPopupShowing={isPopupShowing}
                        togglePopup={togglePopup}
                      ></PopupModal>
                    )}
                  </form>
                  <div className="user-profile__image-input">
                    <div
                      onClick={() => {
                        inputEl.current.click();
                      }}
                      className="user-profile__input-image"
                    >
                      {userAvatar && !previewImage ? (
                        <div
                          className="user-profile__user-image"
                          style={{ backgroundImage: `url(${userAvatar})` }}
                        ></div>
                      ) : userAvatar || previewImage ? (
                        <div
                          className="user-profile__preview-image"
                          onClick={() => {
                            inputEl.current.click();
                          }}
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
                      onClick={() => {
                        inputEl.current.click();
                      }}
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
              </Route>
              <Redirect
                exact
                from="/user"
                to="/user/account/profile"
              ></Redirect>
              <Redirect
                exact
                from="/user/account"
                to="/user/account/profile"
              ></Redirect>
              <Route path="/user/account/email">
                <EmailSmallContent
                  isAccountPage={isAccountPage}
                  email={email}
                  setEmail={setEmail}
                ></EmailSmallContent>
              </Route>
              <Route path="/user/account/password">
                <PasswordSmallContent
                  isAccountPage={isAccountPage}
                  email={email}
                  setEmail={setEmail}
                  setCategory={setCategory}
                ></PasswordSmallContent>
              </Route>
              <Route path="/user/account/address">
                <AddressSmallContent
                  isAccountPage={isAccountPage}
                  setCategory={setCategory}
                ></AddressSmallContent>
              </Route>
              <Route path="/user/account/payment">
                <PaymentSmallContent
                  isAccountPage={isAccountPage}
                  setCategory={setCategory}
                ></PaymentSmallContent>
              </Route>
              <Route path="/user/purchase/">
                <OrderSmallContent
                  isAccountPage={isAccountPage}
                  setCategory={setCategory}
                ></OrderSmallContent>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountContent;
