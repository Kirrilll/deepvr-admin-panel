import React, { useEffect } from "react";
import { Button, Layout, Modal, Space } from 'antd';
import { useAppDispatch, useAppSelector } from "../app/store";
import { useGetRoomsQuery, useGetWorkingShiftQuery } from "../repositories/TimelineApi";
import { fetchTimline } from "../features/timeline/redux/asyncActions";
import BookingCreateModal from "../components/BookingCreateModal";

import { closeWarning, FetchingStatus, unselectCell } from "../features/timeline/redux/slice";

import SettingContainer from "../features/timeline/ui/SettingsContainer";
import Timeline from "../features/timeline/ui/Timeline";
import { TimelineType } from "../entities/TimelineTypes";
import { close } from "../store/creation-booking-modal/slice";
const { Sider, Content } = Layout;

const TimelinePage: React.FC = () => {

    const dispatch = useAppDispatch();

    const { fetchingStatus, options, type, mode, data } = useAppSelector(state => state.timeLineReducer);
    const isOpen = useAppSelector(state => state.modalReducer.isOpen);
    const currentDate = useAppSelector(state => state.datePickerReducer.currentDate);

    const fetchingRooms = useGetRoomsQuery();
    const fetchingWorkingShift = useGetWorkingShiftQuery();
    const onCancel = () => dispatch(close());

    const { isWarningOpen, lastUnselectedItem } = useAppSelector(state => state.timeLineReducer);


    useEffect(() => {
        dispatch(fetchTimline(currentDate));
    }, [currentDate]);

    const isLoading = fetchingStatus == FetchingStatus.LOADING
        && fetchingRooms.isLoading
        && fetchingWorkingShift.isLoading;

    const timelineType: TimelineType = isLoading
        ? 'loading'
        : type;

    const onOk = () => {
        dispatch(unselectCell({
            cell: {
                time: lastUnselectedItem!.time,
                roomId: lastUnselectedItem!.roomId,
                date: lastUnselectedItem!.date
            },
            mode: 'hard'
        }));
        dispatch(closeWarning());
    }

    return (
        <>
            <Modal
                onOk={onOk}
                onCancel={() => dispatch(closeWarning())}
                open={isWarningOpen}>
                <div>У вас образуется временная яма</div>
            </Modal>

            <Layout hasSider>
                <Layout>
                    <Content style={{ padding: 60 }}>
                        <SettingContainer />
                        <Timeline
                            mode={mode}
                            type={timelineType}
                            options={options}
                            glasses={fetchingWorkingShift.data?.glasses ?? 30}
                            data={data}
                            workingShift={fetchingWorkingShift.data?.time ?? []}
                            rooms={fetchingRooms.data ?? []}
                        />
                    </Content>
                </Layout>
                <Sider
                    theme='light'
                    collapsed={!isOpen}
                    collapsedWidth={0}
                    width={500}
                    trigger={<div>Закрыть</div>}
                >
                    <Button onClick={onCancel}>Закрыть</Button>
                    <BookingCreateModal></BookingCreateModal>
                </Sider>

            </Layout>
        </>
    )
}

export default TimelinePage;