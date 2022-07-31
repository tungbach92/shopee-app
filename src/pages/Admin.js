import React, { useState } from "react";
import PropTypes from "prop-types";
import { db } from "../firebase";
import { data } from "../data";

const Admin = (props) => {
  const [items, setItems] = useState(data);
  const addProducts = (item) => {
    //collection.add(data)
    const collection = db.collection("products");
    return collection.add(item);
  };

  const addVariationProp = async (items) => {
    items.forEach((item) => {
      switch (item.category) {
        case "shirt":
          item.variationList = ["M", "L", "XL"];
          break;
        case "pant":
          item.variationList = ["M", "L", "XL"];
          break;
        case "set":
          item.variationList = ["M", "L"];
          break;
        case "bag":
          item.variationList = ["S", "M", "L"];
          break;
        case "shoe":
          item.variationList = ["38", "39", "40", "41"];
          break;
        case "accessories":
          item.variationList = [];
          break;
        default:
          item.variationList = [];
          break;
      }
    });
    setItems(items);
  };

  const createAndAddMock = async () => {
    //mock
    var promises = [];
    await addVariationProp(items);
    items.forEach((element) => {
      const promise = addProducts({
        name: element.name,
        metaTitle: element.metaTitle
          ? element.metaTitle
          : element.name
              .toLowerCase()
              .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
              .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
              .replace(/ì|í|ị|ỉ|ĩ/g, "i")
              .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
              .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
              .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
              .replace(/đ/g, "d")
              .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "")
              .replace(/\u02C6|\u0306|\u031B/g, "")
              .replace(/[^\w ]+/g, "")
              .replace(/ +/g, "-"),
        imageUrl: element.imageUrl,
        imageUrlList: element.imageUrlList ? element.imageUrlList : [],
        price: element.price,
        rating: element.rating
          ? element.rating
          : Math.floor(Math.random() * 5) + 2,
        soldAmount: element.soldAmount
          ? element.soldAmount
          : Math.floor(Math.random() * 2000) + 250,
        description: element.description,
        location: element.location ? element.location : "USA",
        date: element.date ? element.date : new Date().toString(),
        createdBy: 1,
        category: element.category,
        variationList: element.variationList,
        code: 1,
        modifyDate: 1,
        modifyBy: 1,
        status: 1,
        topHot: false,
        promotionPrice: 1,
        includedVAT: true,
        favorite: false,
        discount: Math.floor(Math.random() * 50) + 5,
        freeShip: false,
        metaKeyword: 1,
        metaDescription: 1,
      });

      if (!promise) {
        alert("addProduct() is not implemented yet!");
        return Promise.reject();
      } else {
        promises.push(promise);
      }
    });

    return Promise.all(promises);
    //AddProducts(mock)
  };
  return <button onClick={createAndAddMock}>Add mock</button>;
};

Admin.propTypes = {};

export default Admin;
