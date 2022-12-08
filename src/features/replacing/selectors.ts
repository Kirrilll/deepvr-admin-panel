import { RootState } from "../../app/store"

export const selectReplasingPivot = (state: RootState) => state.replacingReducer.replacingPivot;