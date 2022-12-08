import React, { useRef } from 'react';
import { CellPivot } from '../../../entities/Cell';
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

    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <BookingPopover order={order} >
            <div ref={containerRef} className='cell__container booked-item' style={{ border: `1px solid ${order.color}` }}>
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