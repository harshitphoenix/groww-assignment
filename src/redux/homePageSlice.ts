import { GainerOrLoser } from "@/types/Stock";
import { createSlice } from "@reduxjs/toolkit";

type HomePageState = {
  lastUpdated: Date;
  topGainers: GainerOrLoser[];
  topLosers: GainerOrLoser[];
};

const initialState: HomePageState = {
  lastUpdated: new Date(),
  topGainers: [],
  topLosers: [],
};

export const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setLastUpdated: (state, action) => {
      state.lastUpdated = action.payload;
    },
    setTopGainers: (state, action) => {
      state.topGainers = action.payload;
    },
    setTopLosers: (state, action) => {
      state.topLosers = action.payload;
    },
  },
});

export const { setLastUpdated, setTopGainers, setTopLosers } =
  homePageSlice.actions;

export default homePageSlice.reducer;
