import React, { useEffect } from "react";
import { Layout, Space } from 'antd';
import { Content } from "antd/lib/layout/layout";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useGetRoomsQuery, useGetWorkingShiftQuery } from "../repositories/TimelineApi";
import { fetchTimline } from "../features/timeline/redux/asyncActions";
import BookingCreateModal from "../components/BookingCreateModal";
import { FetchingStatus } from "../features/timeline/redux/slice";
import SettingContainer from "../features/timeline/ui/SettingsContainer";
import Timeline from "../features/timeline/ui/Timeline";
import BookingView from "../entities/BookingView";


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


    const testData: Array<(BookingView | null)[]> = [];


    return (
        <>
            <BookingCreateModal/>
            <Layout style={{ padding: 60 }}>
                <Content>
                    <SettingContainer />
                    <Timeline
                        mode = {{
                            type: 'idle'
                        }}
                        type = 'loading'
                        options={{
                            isFixed: isFixed,
                        }}
                        glasses = {fetchingWorkingShift.data?.glasses ?? 30}
                        data = {testData}
                        workingShift = {fetchingWorkingShift.data?.time ?? []}
                        rooms = {fetchingRooms.data ?? []}

                        // isTranspose={isTranspose}
                        // data={data}
                        // timelineProps={{
                        //     glasses: fetchingWorkingShift.data?.glasses ?? 20,
                        //     isFixed: isFixed,
                        //     isLoading: isLoading,
                        //     rooms: fetchingRooms.data ?? [],
                        //     workingShift: fetchingWorkingShift.data?.time ?? []
                        // }}
                    />
                </Content>
            </Layout>
        </>
    )
}

export default TimelinePage;