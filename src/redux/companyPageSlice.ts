import { AboutCompanyType, CompanyPageHeader } from "@/types/CompanyInfo";
import { Graph } from "@/types/Graph";
import { createSlice } from "@reduxjs/toolkit";

type CompanyPageState = {
  company: AboutCompanyType | null;
  companyHeaderData?: CompanyPageHeader;
  loading?: boolean;
  graphData?: Graph[];
};

const initialState: CompanyPageState = {
  company: null,
  companyHeaderData: undefined,
  loading: true,
  graphData: undefined,
};

export const companyPageSlice = createSlice({
  name: "companyPage",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setCompanyHeaderData: (state, action) => {
      state.companyHeaderData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setGraphData: (state, action) => {
      state.graphData = action.payload;
    },
  },
});

export const { setCompany, setCompanyHeaderData, setLoading,setGraphData } =
  companyPageSlice.actions;

export default companyPageSlice.reducer;
