import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import TimelineFactory from "../../../common/utils/timeline/TimelineFactory";
import { CellContentType } from "../../../entities/Cell";
import { TimelineType } from "../../../entities/TimelineTypes"
import { selectRooms, selectWorkingParams } from "../../game/redux/selectors";
import { CellIndeficator, FetchingStatus } from "./slice";

export const selectType = (state: RootState) => state.timeLineReducer.type;
export const selectOptions = (state: RootState) => state.timeLineReducer.options;
export const selectOrders = (state: RootState) => state.timeLineReducer.data;

export const selectTimelineMap = createDraftSafeSelector(
    [
        (state: RootState) => state.timeLineReducer,
        selectRooms,
        selectWorkingParams
    ],
    (timeline, rooms, workingParams) => TimelineFactory.createTimeline({
        options: timeline.options,
        type: timeline.type,
        rooms: rooms,
        workingParams: workingParams,
        orders: timeline.data
    })
);

export const cellTypeSelector = (state: RootState): CellContentType => {
    const {fetchingStatus, options} = state.timeLineReducer;
    if(fetchingStatus == FetchingStatus.LOADING){
        return 'loading';
    }
    if(options.isSimpliefied){
        return 'simplified'
    }
    return 'default';
}