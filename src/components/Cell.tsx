import React, { useRef } from 'react';
import BookingView from '../entities/BookingView';
import BookedCell from './BookedCell';
import BookingPopover from './BookingPopover';

interface CellProps {
    info: BookingView | null,
}

const Cell: React.FC<CellProps> = ({ info }) => {

    const containerRef = useRef<HTMLDivElement>(null);


    const height = containerRef.current?.parentElement?.style.height;


    return (
        <div ref={containerRef} className='table__cell'>
            {
                info == null
                    ? null
                    : <BookingPopover bookingInfo={info} borderColor={info.color}>
                        <BookedCell color={info.color} bookingInfo={info} />
                    </BookingPopover>
            }
        </div>

    )
}

export default Cell;