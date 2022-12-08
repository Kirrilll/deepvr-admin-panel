import { Button, Col, Popover, PopoverProps, Row, Space } from 'antd';
import React, { useMemo } from 'react';
import ClockIcon from '../../../assets/clock.svg';
import GameIcon from '../../../assets/game.svg';
import PersonIcon from '../../../assets/person.svg';
import PhoneIcon from '../../../assets/phone.svg';

import { useAppDispatch, useAppSelector } from '../../../app/store';
import {editOrder} from '../../booking-creator/redux/slice';
import { OrderView } from '../../../entities/Order';
import { EPaymentStatus } from '../../../entities/PaymentInfo';
import { multiSelectCells } from '../../selection/redux/slice';
import CellMapper from '../../../common/mappers/CellMapper';

type BookingPopupProps = Omit<PopoverProps
    & React.RefAttributes<unknown>
    & { order: OrderView }, 'content'>


interface RowInfrormationProps {
    iconSrc: string,
    title: string,
    additionalInfo?: string
}

const BookingPopover: React.FC<BookingPopupProps> = (props) => {
    return (
        <Popover
            overlayInnerStyle={{ border: `1px solid ${props.order.color}` }}
            showArrow={false}
            trigger='hover'
            placement='rightBottom'
            content={<BookingPopoverContent order={props.order} />}>
            {props.children}
        </Popover>
    )
}

const BookingPopoverContent: React.FC<{ order: OrderView }> = ({ order }) => {

    const dispatch = useAppDispatch();
    const currentDate = order.date
    const paymentStatusView = useMemo(() => {
        if (order.paymentStatus == EPaymentStatus.PAID) {
            return {
                className: 'payment-status paid',
                title: 'Оплачено'
            }
        }
        return {
            className: 'payment-status notpaid',
            title: 'Не оплачено'
        }
    }, [order.paymentStatus]);


    const onClick = () => {
        dispatch(multiSelectCells(CellMapper.toCellFromOrderView(order)))
        dispatch(editOrder(order))
    };

    // const buildTimeInterval = () => {
    //     return `${bookingInfo.timeStart}-${bookingInfo.timeEnd}`;
    // }


    /*
        Номер заказа
Статус оплаты
Время брони (с - до ) было бы отлично
Имя клиента
Номер телефона
Количество гостей
Комментарий
Залы(было бы отлично)

    */

    //Написать селектор с комнатами
    const rooms = useMemo<string>(() => order.bookings.map(booking => booking.roomId).join(','), [order.id]);

    return (
        <>
            <section className='popover__section'>
                <div className='popover__title'>{`Заказ №${order.id}`}</div>
                <div className={paymentStatusView.className}>{`• ${paymentStatusView.title}`}</div>
            </section>
            <section className='popover__section '>
                <Space style={{ width: '100%' }} direction='vertical' size={9}>
                    {/* <RowInformation
                        iconSrc={ClockIcon}
                        title={buildTimeInterval()}
                        additionalInfo={bookingInfo.date.toLocaleDateString()}
                    /> */}
                    <RowInformation
                        iconSrc={PhoneIcon}
                        title={order.phone ?? '8-888-888-88-88'}
                    />
                    {/* <RowInformation
                        iconSrc={GameIcon}
                        title={bookingInfo?.gameTitle ?? ''}
                    />
                    <RowInformation
                        iconSrc={PersonIcon}
                        title={bookingInfo?.guestCount.toString() ?? ''}
                    /> */}
                </Space>
            </section>
            <section className='popover__section'>
                <div className='popover__title'>{'Зал(ы):'}</div>
                <div className='popover__text'>{rooms}</div>
            </section>
            <section className='popover__section'>
                <div className='popover__title'>Комментарий:</div>
                <div className='popover__text'>{order?.comment ?? 'Не указано'}</div>
            </section>
            <Row justify='end'>
                <Button className='default-btn' onClick={onClick}>Редактировать</Button>
            </Row>
        </>
    )
}

const RowInformation: React.FC<RowInfrormationProps> = ({ additionalInfo, iconSrc, title }) => {
    return (
        <Row align='middle' style={{ width: '100%' }}>
            <Col span={3}>
                <img src={iconSrc} />
            </Col>
            <Col span={21}>
                <div className='popover__title'>{title}</div>
                <div className='popover__text'>{additionalInfo}</div>
            </Col>
        </Row>
    )
}

export default BookingPopover;