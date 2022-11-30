import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";

interface WarningState{
    isWarning: boolean,
    message: string,
    interruptedActionType: string | null,
    interruptedActionPayload: any
}

interface InterruptedAction{
    type: string,
    payload: any
}

const initialState: WarningState = {
    isWarning: false,
    message: '',
    interruptedActionPayload: null,
    interruptedActionType: null
}

const warningSlice = createSlice({
    name: 'warningSlice',
    initialState: initialState,
    reducers: {
        addWarning(state, action:PayloadAction<{message: string, interruptedAction: InterruptedAction}>){
            const {message, interruptedAction} = action.payload;
            const {type, payload} = interruptedAction;
            state.isWarning = true;
            state.message = message;
            state.interruptedActionPayload = payload;
            state.interruptedActionType = type;
        },
        removeWarning(state){
            state.isWarning = false;
            state.message = '';
            state.interruptedActionPayload = null;
            state.interruptedActionType = null;
        }
    }
})

export default warningSlice.reducer;

export const {addWarning, removeWarning} = warningSlice.actions;