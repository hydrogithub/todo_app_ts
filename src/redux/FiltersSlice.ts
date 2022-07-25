import { createSlice } from "@reduxjs/toolkit";

export const filtersReducer = createSlice({
  name: "filters",
  initialState: {
    search: "",
    status: "ALL",
  },
  reducers: {
    searchFilterChange: (state, action) => {
      state.search = action.payload;
    },
    statusFilterChange: (state, action) => {
      state.status = action.payload;
    },
  },
});
