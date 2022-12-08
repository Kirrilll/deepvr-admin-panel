import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

interface DatePickerState{
    isOpen: boolean,
    currentDate: moment.Moment
}

const initialState: DatePickerState = {
    isOpen: false,
    currentDate: moment(),
    
}

const datePickerSlice = createSlice({
    name: 'datePickerSlice',
    initialState: initialState,
    reducers: {
        selectDate: (state, action: PayloadAction<moment.Moment>) => {
            state.isOpen = false;
            state.currentDate = action.payload;
        },
        toggleOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
    }
})


export default datePickerSlice.reducer;

export const {selectDate, toggleOpen} = datePickerSlice.actions;