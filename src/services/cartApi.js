import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "../firebase";
export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchCart: builder.query({
      async queryFn(user) {
        try {
          const doc = await db
            .collection("users")
            .doc(user?.uid)
            .collection("cart")
            .doc("cartItems")
            .get();
          let products = [];
          if (doc.exists) {
            products = doc.data().basket.map((item) => ({
              ...item,
              similarDisPlay: false,
              variationDisPlay: false,
            }));
          }
          return { data: products };
        } catch (error) {
          // alert("Lỗi lấy giỏ hàng từ firestore:" + error.message);
          return { error: error };
        }
      },
    }),
    addCartToFireStore: builder.mutation({
      async queryFn({ user, cartProducts }) {
        try {
          let savedCartItems = [];
          const created = Date.now();
          if (cartProducts?.length > 0) {
            savedCartItems = cartProducts.map((item) => {
              const { similarDisPlay, variationDisPlay, ...rest } = item;
              return rest;
            });
          }
          await db
            .collection("users")
            .doc(user.uid)
            .collection("cart")
            .doc("cartItems")
            .set({
              basket: savedCartItems,
              created: created,
            });
          return { data: "ok" };
        } catch (error) {
          //   alert("Lỗi lưu giỏ hàng:" + error.message);
          return { error: error };
        }
      },
    }),
  }),
});
export const { useFetchCartQuery, useAddCartToFireStoreMutation } = cartApi;
