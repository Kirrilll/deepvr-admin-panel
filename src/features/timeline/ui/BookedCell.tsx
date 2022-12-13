import { Col, Row } from 'antd';
import React, { useRef } from 'react';
import { BookingView } from '../../../entities/Booking';
import { CellPivot } from '../../../entities/Cell';
import BookingPopover from './BookingPopover';
import ConfirmStatusTag from './ConfirmStatusTag'
import PERSON_ICON from '../../../assets/person.svg';

interface BookedCellProps {
    pivot: CellPivot,
    isSimplified?: boolean
}

interface BookedCellHeaderProps {
    id: number,
    guestCount: number,
    color: string
}

interface BookedCellBodyProps {
    booking: BookingView
}

//Хранит order и index в bookings
const BookedCell: React.FC<BookedCellProps> = ({ pivot, isSimplified = false }) => {

    const { order, bookingIndex } = pivot;
    const currBooking = order.bookings[bookingIndex];

    return (
        <BookingPopover order={order} >
            <div className='cell__container booked-item' style={{ border: `1px solid ${order.color}` }}>
                <BookedCellHeader id={order.id} color={order.color} guestCount={currBooking.guestCount} />
                {!isSimplified
                    ? <BookedCellBody booking={currBooking} />
                    : null
                }
            </div>
        </BookingPopover>

    )
}

export default BookedCell;



const BookedCellBody: React.FC<BookedCellBodyProps> = ({ booking }) => {
    return (
        <div className='cell__wrapper'>
            <p className='booked-item__title'>
                {booking.gameTitle}
            </p>
            <ConfirmStatusTag status={booking.confirmStatus} />
        </div>
    )
}

const BookedCellHeader: React.FC<BookedCellHeaderProps> = ({ id, guestCount, color }) => {
    return (
        <div className='cell__header' style={{ backgroundColor: color }}>
            <div>{`Заказ №${id}`}</div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <img style={{height: '15px', width: '15px'}} src={PERSON_ICON} />
                <div>{guestCount}</div>
            </div>
        </div>
    )
}

