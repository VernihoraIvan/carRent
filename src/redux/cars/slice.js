import { createSlice } from '@reduxjs/toolkit';

import {fetchBrands, fetchAllCars} from "./thunk";

const initialState = {};

const carSlice = createSlice({
    name: "cars",
    initialState,
    extraReducers: {
        [fetchAllCars.fulfilled](state, action) {
            state.items = action.payload;            
        },
        [fetchBrands.fulfilled](state, action) {
            state.brands = action.payload;
        }
    }
})

export const carsReducer = carSlice.reducer;