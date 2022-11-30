import React, { useEffect } from "react";
import { Button, Drawer, Layout, Modal, Space, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from "../app/store";
import { fetchTimline } from "../features/timeline/redux/asyncActions";
import { close } from "../features/booking-creator/redux/slice";

import { FetchingStatus } from "../features/timeline/redux/slice";

import SettingContainer from "../features/timeline/ui/SettingsContainer";
import Timeline from "../features/timeline/ui/Timeline";
import { TimelineType } from "../entities/TimelineTypes";
import StorageService from "../common/services/StorageService";
import { closeWarning, unselectCell } from "../features/selection/redux/slice";
import OrderCreationForm from "../features/booking-creator/ui/OrderCreateForm";
import { isTimelineReadySelector, selectRooms, selectWorkingParams } from "../features/game/redux/selectors";
import { getGames, getRooms, getWorkingParams } from "../features/game/redux/asyncActions";
import { selectIsCreated } from "../features/booking-creator/redux/selectors";
import WarningModal from "../features/warning-modal/ui/WarningModal";
const { Sider, Content } = Layout;

const TimelinePage: React.FC = () => {

    const dispatch = useAppDispatch();

    const { fetchingStatus, options, type, mode, data } = useAppSelector(state => state.timeLineReducer);
    const isOpen = useAppSelector(state => state.orderCreationReducer.isOpen);
    const currentDate = useAppSelector(state => state.datePickerReducer.currentDate);

    const workingParams = useAppSelector(selectWorkingParams);
    const rooms = useAppSelector(selectRooms);
    const isReady = useAppSelector(isTimelineReadySelector);
    const isCreated = useAppSelector(selectIsCreated);

    const onCancel = () => dispatch(close());

    const isWarning = useAppSelector(state => state.selectionReducer.isWarning);

    useEffect(() => {
        dispatch(getGames());
        dispatch(getRooms());
        dispatch(getWorkingParams());
    }, [])

    useEffect(() => {
        dispatch(fetchTimline(currentDate));
    }, [currentDate]);


    const timelineType: TimelineType = !isReady
        ? 'loading'
        : type;

    const onOk = () => {
        dispatch(unselectCell(StorageService.instance.getItem('lastSelectedItem')!));
        dispatch(closeWarning())
    }

    return (
        <>
            <WarningModal/>

            <Layout hasSider>
                <Layout>
                    <Content style={{ padding: 60 }}>
                        <SettingContainer />
                        <Timeline
                            mode={mode}
                            type={timelineType}
                            options={options}
                            glasses={workingParams.glasses}
                            data={data}
                            workingShift={workingParams.time}
                            rooms={rooms}
                        />
                    </Content>
                </Layout>
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'sticky',
                            top: 0,
                            right: 0
                        }}
                        theme='light'
                        collapsed={!isOpen}
                        collapsedWidth={0}
                        width={700}
                        trigger={<div>Закрыть</div>}
                    // className = {'creating-sider'}
                    >
                        <Button onClick={onCancel}>Закрыть</Button>
                        {
                            isCreated
                                ? <OrderCreationForm />
                                : <Spin></Spin>
                        }
                    </Sider>
            </Layout>
        </>
    )
}

export default TimelinePage;