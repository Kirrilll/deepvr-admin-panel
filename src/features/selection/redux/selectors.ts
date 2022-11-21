import { RootState } from "../../../app/store";
import { TimelineMode, TimelineModeType } from "../../../entities/TimelineOptions";

export const selectMode = (state: RootState): TimelineModeType => state.selectionReducer.isSelection ? 'selection' : 'idle'; 