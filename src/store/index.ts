import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";
import { productSlice } from "./product/product.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
