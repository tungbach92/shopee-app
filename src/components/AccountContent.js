import React, { useState, useEffect, useContext, useRef } from "react";
import { ProductContext } from "../context";
import { auth, db, storage } from "../firebase";
import {
  Link,
  Switch,
  Route,
  Redirect,
  NavLink,
  useRouteMatch,
} from "react-router-dom";
import EmailSmallContent from "./EmailSmallContent";
import PasswordSmallContent from "./PasswordSmallContent";
import AddressSmallContent from "./AddressSmallContent";
import PaymentSmallContent from "./PaymentSmallContent";
import OrderSmallContent from "./OrderSmallContent";
import AccountForm from "../features/Account/components/AccountForm";

const AccountContent = () => {
  const { user, userAvatar, setUserAvatar, loading, setLoading } =
    useContext(ProductContext);
  const match = useRouteMatch();
  console.log(match);
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

  const handleInfoSubmit = ({
    user: userName,
    name,
    phone,
    gender,
    birthday,
  }) => {
    // e.preventDefault();
    console.log("submit");
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
        .doc("infoItems") // TO DO: need to create document infoItems before update infoItems
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
              //set user avatar
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
          console.log("Upload image successfully");
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
                    alt=""
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
                to={`${match.url}/profile`}
                className="user-profile__name-btn"
              >
                Sửa Hồ Sơ
              </Link>
            </div>
            <div className="user-profile__category">
              {/* <div className="user-profile__my-user">Tài Khoản Của Tôi</div> */}
              <NavLink
                to={`${match.url}/profile`}
                className="user-profile__my-info"
                activeClassName="user-profile__category-item--active"
              >
                Hồ sơ
              </NavLink>
              <NavLink
                to={`${match.url}/payment`}
                className="user-profile__my-bank"
                activeClassName="user-profile__category-item--active"
              >
                Ngân hàng
              </NavLink>
              <NavLink
                to={`${match.url}/address`}
                className="user-profile__my-adress"
                activeClassName="user-profile__category-item--active"
              >
                Địa chỉ
              </NavLink>
              <NavLink
                to={`${match.url}/password`}
                className="user-profile__change-password"
                activeClassName="user-profile__category-item--active"
              >
                Đổi mật khẩu
              </NavLink>
              <NavLink
                to={`${match.url}/purchase`}
                className="user-profile__order"
                activeClassName="user-profile__category-item--active"
              >
                Đơn Mua
              </NavLink>
            </div>
          </div>
          <div className="grid__col-10x">
            <Switch>
              <Route exact path={`${match.url}/profile`}>
                <div className="user-profile__title-container">
                  <div className="user-profile__title">
                    <div className="user-profile__label">Hồ Sơ Của Tôi</div>
                    <div className="user-profile__label-detail">
                      Quản lý thông tin hồ sơ để bảo mật tài khoản
                    </div>
                  </div>
                </div>
                <div className="user-profile__content">
                  <AccountForm
                    userName={userName}
                    name={name}
                    email={email}
                    phone={phone}
                    gender={gender}
                    birthday={birthday}
                    userAvatar={userAvatar}
                    previewImage={previewImage}
                    setPreviewImage={setPreviewImage}
                    setFileImage={setFileImage}
                    uploadProceesing={uploadProceesing}
                    setUploadSuccess={setUploadSuccess}
                    handleInfoSubmit={handleInfoSubmit}
                    isAnyUserInfoUpdateFail={isAnyUserInfoUpdateFail}
                    url={match.url}
                  ></AccountForm>
                </div>
              </Route>
              <Redirect
                exact
                from={`${match.url}`}
                to={`${match.url}/profile`}
              />
              <Route path={`${match.url}/email`}>
                <EmailSmallContent
                  email={email}
                  setEmail={setEmail}
                ></EmailSmallContent>
              </Route>
              <Route path={`${match.url}/password`}>
                <PasswordSmallContent
                  email={email}
                  setEmail={setEmail}
                ></PasswordSmallContent>
              </Route>
              <Route path={`${match.url}/address`}>
                <AddressSmallContent></AddressSmallContent>
              </Route>
              <Route exact path={`${match.url}/payment`}>
                <PaymentSmallContent></PaymentSmallContent>
              </Route>
              <Route path={`${match.url}/purchase`}>
                <OrderSmallContent></OrderSmallContent>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountContent;
