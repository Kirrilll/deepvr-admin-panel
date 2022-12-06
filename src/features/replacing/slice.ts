import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CellHelper from "../../common/helpers/CellHelper";
import { CellPivot, CellView } from "../../entities/Cell";


interface ReplacingState {
    replacingPivot: CellPivot | null,
    replacedPivots: CellPivot[],
}

const initialState: ReplacingState = {
    replacingPivot: null,
    replacedPivots: [],
}

const replacingSlice = createSlice({
    name: 'replacingSlice',
    initialState: initialState,
    reducers: {
        startReplacing: (state, action: PayloadAction<CellPivot>) => {
            const replacingPivot = action.payload;
            state.replacingPivot = replacingPivot;
            if (~state.replacedPivots.findIndex(pivot => CellHelper.isCellsPivotsEquals(pivot, replacingPivot))) {
                state.replacedPivots = state.replacedPivots.filter(pivot => !CellHelper.isCellsPivotsEquals(pivot, replacingPivot))
            }
        },
        // endReplacing: (state, action: PayloadAction<CellView>) => {
        //     const replacingPivot = state.replacingPivot;
        //     state.replacingPivot = null;
        //     state.replacedPivots.push({order:});
        // }
    }
})

export default replacingSlice.reducer