import React from 'react';
import OrderView, { EConfirmStatus } from '../../../entities/OrderView';
import { CellPivot } from '../../../entities/TimelineTypes';
import BookingPopover from './BookingPopover';
import ConfirmStatusTag from './ConfirmStatusTag'

interface BookedCellProps {
    pivot: CellPivot,
}
//Хранит order и index в bookings
const BookedCell: React.FC<BookedCellProps> = (props) => {


    const { pivot } = props;
    const {order, bookingIndex} = pivot;

    const title = order.bookings[bookingIndex].gameTitle;
    const confirmStatus = order.bookings[bookingIndex].confirmStatus;


    return (
        <BookingPopover order={order} >
            <div className='cell__container booked-item' style={{ border: `1px solid ${order.color}` }}>
                <div className='cell__header' style={{ backgroundColor: order.color }}>
                    {`Заказ ${order.id}`}
                </div>
                <div className='cell__wrapper'>
                    <p className='booked-item__title'>
                        {title}
                    </p>
                    <ConfirmStatusTag status={confirmStatus} />
                </div>
            </div>
        </BookingPopover>

    )
}

export default BookedCell;