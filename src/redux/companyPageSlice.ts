import { createSlice } from "@reduxjs/toolkit";

type CompanyPageState = {
  name: string;
  address: string;
  phone: string;
  email: string;
};

const initialState: CompanyPageState = {
  name: "",
  address: "",
  phone: "",
  email: "",
};

export const companyPageSlice = createSlice({
  name: "companyPage",
  initialState,
  reducers: {
    setCompanyPage(state, action) {
      state.name = action.payload.name;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
    },
  },
});

export const { setCompanyPage } = companyPageSlice.actions;

export default companyPageSlice.reducer;
