import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";

interface WarningState{
    isWarning: boolean,
    message: string,
    onOkActionType: string | null,
    onOkActionPayload: any
}

interface InterruptedAction{
    type: string,
    payload: any
}

const initialState: WarningState = {
    isWarning: false,
    message: '',
    onOkActionPayload: null,
    onOkActionType: null
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
            state.onOkActionPayload = payload;
            state.onOkActionType = type;
        },
        removeWarning(state){
            state.isWarning = false;
            state.message = '';
            state.onOkActionPayload = null;
            state.onOkActionType = null;
        }
    }
})

export default warningSlice.reducer;

export const {addWarning, removeWarning} = warningSlice.actions;