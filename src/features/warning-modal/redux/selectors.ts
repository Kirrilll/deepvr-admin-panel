import { RootState } from "../../../app/store";

export const selectWarningState = (state: RootState) => state.warningReducer; 