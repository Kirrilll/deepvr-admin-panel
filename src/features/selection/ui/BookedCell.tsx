import { Col, Row } from 'antd';
import React, { useRef } from 'react';
import { BookingView } from '../../../entities/Booking';
import { CellPivot } from '../../../entities/Cell';
import BookingPopover from './BookingPopover';
import ConfirmStatusTag from '../../timeline/ui/ConfirmStatusTag'
import GUEST_ICON from '../../../assets/guest.svg';

interface BookedCellProps {
    pivots: CellPivot[],
    bookingView: React.FC<BookingViewProps>
}


//Контейнер, отображающий все брони в текущей ячейке
const BookedCell: React.FC<BookedCellProps> = ({ pivots, bookingView }) => {

    return (
        <div className='cell__container booked-item'>
            {pivots.map(pivot => (
                <BookingPopover order={pivot.order} >
                    {bookingView({
                        booking: pivot.order.bookings[pivot.bookingIndex],
                        color: pivot.order.color,
                        orderId: pivot.order.id
                    })}
                </BookingPopover>
            ))}


            {/* <div className='cell__container booked-item' style={{ border: `1px solid ${order.color}` }}>

            </div> */}

        </div>
    )
}

export default BookedCell;


interface BookingViewProps {
    orderId: number,
    color: string,
    booking: BookingView
}

interface BookingHeaderProps {
    id: number,
    color: string,
    guestCount: number
}

interface BookingBodyProps {
    booking: BookingView
}

export const SimplifiedBookingView: React.FC<BookingViewProps> = ({ orderId, booking, color }) => {
    return (
        <div style = {{height: '100%', display: 'flex' }}>
            <BookedCellHeader id={orderId} color={color} guestCount={booking.guestCount} />
        </div>


    );
}

export const DefaultBookingView: React.FC<BookingViewProps> = ({ orderId, booking, color }) => {
    return (
        <div>
            <BookedCellHeader id={orderId} color={color} guestCount={booking.guestCount} />
            <BookedCellBody booking={booking} />
        </div>
    );
}

export const SpacedBookingView: React.FC<BookingViewProps> = ({ orderId, booking, color }) => {
    return (
        <>
            <BookedCellHeader id={orderId} color={color} guestCount={booking.guestCount} />
            <div style={{
                flexGrow: 2
            }} />
        </>
    )
}


const BookedCellBody: React.FC<BookingBodyProps> = ({ booking }) => {
    return (
        <div className='cell__wrapper'>
            <p className='booked-item__title'>
                {booking.gameTitle}
            </p>
            <ConfirmStatusTag status={booking.confirmStatus} />
        </div>
    )
}

const BookedCellHeader: React.FC<BookingHeaderProps> = ({ id, color, guestCount }) => {
    return (
        <div className='cell__header' style={{ backgroundColor: color }}>
            <div>{`Заказ №${id}`}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div>{guestCount}</div>
                <img style={{ height: '17px', width: '17px' }} src={GUEST_ICON} />
            </div>
        </div>
    )
}

