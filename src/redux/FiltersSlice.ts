import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filters } from "interface";

const initialState: Filters = {
    search: "",
    status: "ALL",
};

export const filtersReducer = createSlice({
    name: "filters",
    initialState,
    reducers: {
        searchFilterChange: (state: Filters, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        statusFilterChange: (state: Filters, action: PayloadAction<string>) => {
            state.status = action.payload;
        },
    },
});
