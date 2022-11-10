import React from 'react';
import OrderView, { EConfirmStatus } from '../../../entities/OrderView';
import BookingPopover from './BookingPopover';
import ConfirmStatusTag from './ConfirmStatusTag'

interface BookedCellProps {
    bookingInfo: OrderView,
}
//Хранит order и index в bookings
const BookedCell: React.FC<BookedCellProps> = (props) => {


    const { bookingInfo } = props;
    const { id,} = bookingInfo;

    const title = 'Рандомное название';
    const confirmStatus = EConfirmStatus.CONFIRM;


    return (
        <BookingPopover order={bookingInfo} >
            <div className='cell__container booked-item' style={{ border: `1px solid ${bookingInfo.color}` }}>
                <div className='cell__header' style={{ backgroundColor: bookingInfo.color }}>
                    {`Заказ ${id}`}
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