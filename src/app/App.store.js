import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    _dummy: (state = null) => state,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
