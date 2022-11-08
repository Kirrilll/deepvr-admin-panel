import { Button, Col, Popover, PopoverProps, Row, Space } from 'antd';
import React, { useMemo } from 'react';
import ClockIcon from '../../../assets/clock.svg';
import GameIcon from '../../../assets/game.svg';
import PersonIcon from '../../../assets/person.svg';
import PhoneIcon from '../../../assets/phone.svg';
import BookingView, { EPaymentStatus } from '../../../entities/BookingView';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import {open} from '../../../store/creation-booking-modal/slice';

type BookingPopupProps = Omit<PopoverProps
    & React.RefAttributes<unknown>
    & { bookingInfo: BookingView}, 'content'>


interface RowInfrormationProps {
    iconSrc: string,
    title: string,
    additionalInfo?: string
}

const BookingPopover: React.FC<BookingPopupProps> = (props) => {
    return (
        <Popover
            overlayInnerStyle={{ border: `1px solid ${props.bookingInfo.color}` }}
            showArrow={false}
            trigger='hover'
            placement='rightBottom'
            content={<BookingPopoverContent bookingInfo={props.bookingInfo} />}>
            {props.children}
        </Popover>
    )
}

const BookingPopoverContent: React.FC<{ bookingInfo: BookingView}> = ({ bookingInfo }) => {


    const dispatch = useAppDispatch();
    const currentDate = useAppSelector(state => state.datePickerReducer.currentDate);

    const paymentStatusView = useMemo(() => {
        if(bookingInfo.paymentStatus == EPaymentStatus.PAID){
            return {
                className: 'payment-status paid',
                title: 'Оплачено'
            }
        }
        return {
            className: 'payment-status notpaid',
            title: 'Не оплачено'
        }
    }, [bookingInfo.paymentStatus]);

    const onClick = () => dispatch(open({
        initialData: bookingInfo,
        initialTime: bookingInfo.timeStart,
        initialRoomId: bookingInfo.room_id,
        initialDate: currentDate
    }));

    const buildTimeInterval = () => {
        return `${bookingInfo.timeStart}-${bookingInfo.timeEnd}`;
    }

    return (
        <>
            <section className='popover__section'>
                <div className='popover__title'>{`Заказ №${bookingInfo?.id}`}</div>
                <div className={paymentStatusView.className}>{`• ${paymentStatusView.title}`}</div>
            </section>
            <section className='popover__section '>
                <Space style={{ width: '100%' }} direction='vertical' size={9}>
                    <RowInformation
                        iconSrc={ClockIcon}
                        title={buildTimeInterval()}
                        additionalInfo={bookingInfo.date.toLocaleDateString()}
                    />
                    <RowInformation
                        iconSrc={PhoneIcon}
                        title={bookingInfo?.phone ?? '8-888-888-88-88'}
                    />
                    <RowInformation
                        iconSrc={GameIcon}
                        title={bookingInfo?.title ?? ''}
                    />
                    <RowInformation
                        iconSrc={PersonIcon}
                        title={bookingInfo?.guestCount.toString() ?? ''}
                    />
                </Space>
            </section>
            {/* <section className='popover__section'>
                <div className='popover__title'>{'Зал(ы):'}</div>
                <div className='popover__text'>{(bookingInfo?.rooms ?? []).join(';')}</div>
            </section> */}
            <section className='popover__section'>
                <div className='popover__title'>Комментарий:</div>
                <div className='popover__text'>{bookingInfo?.comment ?? 'Не указано'}</div>
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