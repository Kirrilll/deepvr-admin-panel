import React, { useRef } from 'react';
import BookingView from '../entities/BookingView';
import BookedCell from './BookedCell';

interface CellProps {
    info: BookingView | null,
}

const Cell: React.FC<CellProps> = ({ info }) => {

    const containerRef = useRef<HTMLDivElement>(null);
    
    return (
        <div ref={containerRef} className='table__cell'>
            {
                info == null
                    ? null
                    : <BookedCell bookingInfo={info} />
                  
            }
        </div>

    )
}

export default Cell;