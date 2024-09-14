import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Rieles: []
};

export const RielesReducer = createSlice({
    name: "Rieles",
    initialState,
    reducers: {
        setRielesFeature: (state, action) => {
            state.Rieles = action.payload;
            console.log(action.payload);
        }
    }
});

export const { setRielesFeature } = RielesReducer.actions;

export const selectRieles = (state) => state.Rieles.Rieles;

export default RielesReducer.reducer;
