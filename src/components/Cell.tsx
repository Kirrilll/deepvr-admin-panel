import React from 'react';
import { BookingInfo } from '../types';
import BookedCell from './BookedCell';


const Cell: React.FC<{info: BookingInfo | null}> = ({info}) => {
    return (
        info == null 
            ? null
            : <BookedCell color='green' bookingInfo={info}></BookedCell>
    )
}

export default Cell;