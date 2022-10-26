import React from 'react';
import { BookingInfo } from '../types';
import BookedCell from './BookedCell';
import BookingPopover from './BookingPopover';

interface CellProps {
    info: BookingInfo | null,
    borderColor: string
}

const Cell: React.FC<CellProps> = ({ info, borderColor }) => {
    return (
        <div className='table__cell'>
            {
                info == null
                    ? null
                    : <BookingPopover bookingInfo={info} borderColor = {borderColor}> <BookedCell color={borderColor} bookingInfo={info} /></BookingPopover>
            }
        </div>

    )
}

export default Cell;