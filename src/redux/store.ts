import { configureStore } from "@reduxjs/toolkit";
import { companyPageSlice } from "./companyPageSlice";
import { homePageSlice } from "./homePageSlice";
export const store = configureStore({
  reducer: {
    company: companyPageSlice.reducer,
    home: homePageSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
