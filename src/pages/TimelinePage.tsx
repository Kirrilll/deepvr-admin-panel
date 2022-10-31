import React, { useEffect } from "react";
import { Layout, Space } from 'antd';
import Timeline from '../components/Timeline';
import { Content } from "antd/lib/layout/layout";
import SettingContainer from "../components/SettingsContainer";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useGetRoomsQuery } from "../services/timelineApi";
import { fetchTimline, getRooms } from "../store/timeline-slice/asyncActions";
import { FetchingStatus } from "../store/timeline-slice/slice";


const TimelinePage: React.FC = () => {

    const dispatch = useAppDispatch();

    const { rooms, roomFetchingStatus, fetchingStatus, dataView } = useAppSelector(state => state.timeLineReducer);
    const currentDate = useAppSelector(state => state.datePickerReducer.currentDate);


    useEffect(() => {
        dispatch(getRooms());
    }, [])

    useEffect(() => {
        dispatch(fetchTimline(currentDate));
    }, [currentDate]);


    const isLoading = fetchingStatus == FetchingStatus.LOADING && roomFetchingStatus == FetchingStatus.LOADING;


    const workingShift = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((value, index) => `${10 + index}:00`);

    return (
        <Layout style={{ padding: 60 }}>
            <Content>
                <SettingContainer />
                <Timeline
                    shedule={dataView}
                    rooms={rooms}
                    isLoading={isLoading}
                    workingShift={workingShift}
                />
            </Content>
        </Layout>
    )
}

export default TimelinePage;