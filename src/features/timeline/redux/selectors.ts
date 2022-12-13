import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import TimeHelper from "../../../common/helpers/TimeHelper";
import TimelineHelper from "../../../common/helpers/TimelineHelper";
import TimelineFactory from "../../../common/utils/timeline/TimelineFactory";
import { CellContentType } from "../../../entities/Cell";
import { EConfirmStatus } from "../../../entities/PaymentInfo";
import { TimelineType } from "../../../entities/TimelineTypes"
import { selectRooms, selectWorkingParams } from "../../game/redux/selectors";
import { CellIndeficator, FetchingStatus } from "./slice";

export const selectType = (state: RootState) => state.timeLineReducer.type;
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
        type: timeline.type,
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
    if(options.isSimpliefied){
        return 'simplified'
    }
    return 'default';
}



// export const selectGlassesAt