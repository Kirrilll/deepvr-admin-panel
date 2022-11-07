import React, { useEffect } from "react";
import { Layout, Space } from 'antd';
import Timeline from '../components/Timeline';
import { Content } from "antd/lib/layout/layout";
import SettingContainer from "../components/SettingsContainer";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useGetRoomsQuery, useGetWorkingShiftQuery } from "../repositories/TimelineApi";
import { fetchTimline } from "../store/timeline-slice/asyncActions";
import { FetchingStatus } from "../store/timeline-slice/slice";
import TimelineBuilder from "../components/TimelineBuilder";
import BookingMapper from "../mappers/BookingMapper";
import BookingPopover from "../components/BookingPopover";
import { EConfirmStatus, EPaymentStatus } from "../entities/BookingView";
import BookingCreateModal from "../components/BookingCreateModal";


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
        <>
            <BookingCreateModal/>
            <Layout style={{ padding: 60 }}>
                <Content>
                    <SettingContainer />
                    <TimelineBuilder
                        isTranspose={isTranspose}
                        data={data}
                        timelineProps={{
                            glasses: fetchingWorkingShift.data?.glasses ?? 20,
                            isFixed: isFixed,
                            isLoading: isLoading,
                            rooms: fetchingRooms.data ?? [],
                            workingShift: fetchingWorkingShift.data?.time ?? []
                        }}
                    />
                </Content>
            </Layout>
        </>
    )
}

export default TimelinePage;