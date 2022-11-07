import React, { useRef } from 'react';
import BookingView from '../entities/BookingView';
import { open } from '../store/creation-booking-modal/slice';
import { useAppDispatch, useAppSelector } from '../store/store';
import BookedCell from './BookedCell';

interface CellProps {
    info: BookingView | null,
    time: string,
    roomId: number
}

const Cell: React.FC<CellProps> = ({ info, time, roomId }) => {


    const dispatch = useAppDispatch();
    const currentDate = useAppSelector(state => state.datePickerReducer.currentDate);

    const onCellClick = () => {
        dispatch(open({
            initialData: info,
            initialRoomId: roomId,
            initialTime: time,
            initialDate: currentDate
        }));
    }

    return (
        <div onClick={onCellClick} className='table__cell'>
            {
                info == null
                    ? null
                    : <BookedCell bookingInfo={info} />
                  
            }
        </div>

    )
}

export default Cell;