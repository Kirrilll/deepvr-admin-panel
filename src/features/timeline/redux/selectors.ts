import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import TimelineFactory from "../../../common/utils/timeline/TimelineFactory";
import { CellContentType } from "../../../entities/Cell";
import { EConfirmStatus } from "../../../entities/PaymentInfo";
import { selectRooms, selectWorkingParams } from "../../game/redux/selectors";
import { CellIndeficator, FetchingStatus } from "./slice";

export const selectType = (state: RootState) => state.timeLineReducer.timelineView;
export const selectOptions = (state: RootState) => state.timeLineReducer.options;
export const selectOrders = (state: RootState) => {
    const {data, options} = state.timeLineReducer;
    const {isShowCanceled} = options;
    if(isShowCanceled == true){
        return data;
    }
    return data.filter(order => {
        return order.confirmStatus != EConfirmStatus.CANCELED
    });
} 

export const timelineSelector = createDraftSafeSelector(
    [
        (state: RootState) => state.timeLineReducer,
        selectOrders,
        selectRooms,
        selectWorkingParams
    ],
    (timeline, orders, rooms, workingParams) => TimelineFactory.createTimeline({
        options: timeline.options,
        type: timeline.timelineView,
        rooms: rooms,
        workingParams: workingParams,
        orders: orders
    })
);

export const cellTypeSelector = (state: RootState): CellContentType => {
    const {fetchingStatus, options} = state.timeLineReducer;
    if(fetchingStatus == FetchingStatus.LOADING){
        return 'loading';
    }
    return options.cellView;
}

export const availableGlassesByTimeSelector = createDraftSafeSelector(
    [
        timelineSelector,
        (state, time: string) => time
    ],
    (timeline, time) => timeline.remainingGlassesMap.get(time) ?? 0
)

export const availableGlassesSelector = createSelector(
    [timelineSelector],
    (timeline) => timeline.remainingGlassesMap
)


// export const selectGlassesAt