import React, { useEffect } from "react";
import { Button, Drawer, Layout, message, Modal, Space, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from "../app/store";
import { fetchTimline } from "../features/timeline/redux/asyncActions";
import { close } from "../features/booking-creator/redux/slice";

import { FetchingStatus } from "../features/timeline/redux/slice";

import SettingContainer from "../features/timeline/ui/SettingsContainer";
import TimelineTable from "../features/timeline/ui/Timeline";
import { TimelineType } from "../entities/TimelineTypes";
import StorageService from "../common/services/StorageService";
import { closeWarning, resetSelection, unselectCell } from "../features/selection/redux/slice";
import OrderCreationForm, { OrderFormState } from "../features/booking-creator/ui/OrderCreateForm";
import { isTimelineReadySelector, selectRooms, selectWorkingParams } from "../features/game/redux/selectors";
import { getGames, getRooms, getWorkingParams } from "../features/game/redux/asyncActions";
import WarningModal from "../features/warning-modal/ui/WarningModal";
import { createOrder } from "../features/booking-creator/redux/asyncActions";
import OrderMapper from "../common/mappers/OrderMapper";
import { selectOrders, timelineSelector } from "../features/timeline/redux/selectors";
const { Sider, Content } = Layout;


interface SocketMessage {
    id: string,
    channel: number,
    message: string
}

const TimelinePage: React.FC = () => {

    const dispatch = useAppDispatch();

    const { options, timelineView: type } = useAppSelector(state => state.timeLineReducer);
    const timeline = useAppSelector(timelineSelector);
    const isOpen = useAppSelector(state => state.orderCreationReducer.isCreating);
    const currentDate = useAppSelector(state => state.datePickerReducer.currentDate);

    const isReady = useAppSelector(isTimelineReadySelector);

    const onCancel = () => {
        dispatch(close());
        dispatch(resetSelection());
    };

    const onFinish = (value: OrderFormState) => {
        dispatch(createOrder(OrderMapper.toDtoFromForm(value)));
    }


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
    

    return (
        <>
            <WarningModal />
            <Layout hasSider>
                <Layout>
                    <Content style={{ padding: 60 }}>
                        <SettingContainer />
                        <TimelineTable
                            dispatch={dispatch}
                            type={timelineType}
                            options={options}
                            timeline={timeline}
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
                        isOpen
                            ? <OrderCreationForm onFinish={onFinish} />
                            : <Spin></Spin>
                    }
                </Sider>
            </Layout>
        </>
    )
}

export default TimelinePage;