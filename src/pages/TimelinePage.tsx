import React, { useEffect } from "react";
import { Layout, Space } from 'antd';
import Timeline from '../components/Timeline';
import { Content } from "antd/lib/layout/layout";
import SettingContainer from "../components/SettingsContainer";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useGetRoomsQuery, useGetWorkingShiftQuery } from "../services/timelineApi";
import { fetchTimline, getRooms } from "../store/timeline-slice/asyncActions";
import { FetchingStatus } from "../store/timeline-slice/slice";
import TimelineBuilder from "../components/TimelineBuilder";
import BookingMapper from "../BookingMapper";
import BookingPopover from "../components/BookingPopover";
import { EConfirmStatus, EPaymentStatus } from "../entities/BookingView";


const TimelinePage: React.FC = () => {

    const dispatch = useAppDispatch();

    const { fetchingStatus, isFixed, isTranspose, data } = useAppSelector(state => state.timeLineReducer);
    const currentDate = useAppSelector(state => state.datePickerReducer.currentDate);

    const fetchingRooms = useGetRoomsQuery();
    const fetchingWorkingShift = useGetWorkingShiftQuery();


    useEffect(() => {
        dispatch(fetchTimline(currentDate));
    }, [currentDate]);

    const isLoading = fetchingStatus == FetchingStatus.LOADING
        && fetchingRooms.isLoading
        && fetchingWorkingShift.isLoading;

    return (
        <Layout style={{ padding: 60 }}>
            <Content>
                <SettingContainer />
                <TimelineBuilder
                    isTranspose={isTranspose}
                    data={data}
                    timelineProps={{
                        isFixed: isFixed,
                        isLoading: isLoading,
                        rooms: fetchingRooms.data ?? [],
                        workingShift: fetchingWorkingShift.data ?? []
                    }}
                />
            </Content>
        </Layout>
    )
}

export default TimelinePage;