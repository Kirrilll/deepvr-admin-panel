import React from 'react';
import { BookingInfo } from '../types';
import ConfirmStatusTag from './ConfirmStatusTag';

interface BookedCellProps{
    bookingInfo: BookingInfo,
    color: string,
}

const BookedCell: React.FC<BookedCellProps> = (props) => {


    const {bookingInfo, color} = props;
    const {id, title, confirmStatus} = bookingInfo;

    

    return (
        <div className='cell__container booked-item' style={{border: `1px solid ${color}`}}>
            <div className='cell__header' style={{backgroundColor: color}}>
                {`Заказ ${id}`}
            </div>
            <div className='cell__wrapper'>
                <p className='booked-item__title'>
                    {title}
                </p>
                <ConfirmStatusTag status={confirmStatus}/>
            </div>
        </div>
    )
}

export default BookedCell;