import React, { useRef } from 'react';
import OrderView, { OrderApart } from '../../../entities/OrderView';
import { open } from '../../../store/creation-booking-modal/slice';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import BookedCell from './BookedCell';

type CellMode = 'selected' | 'selectable' | 'unselectable'

interface CellProps {
    info: OrderView | null,
    time: string,
    roomId: number
}

//Является по сути factory, 
//Если ячейка selectable
//Ячейка сама определяет является ли она ВЫБИРАЕМОЙ
const Cell: React.FC<CellProps> = ({ info, time, roomId }) => {


    const dispatch = useAppDispatch();
    const currentDate = useAppSelector(state => state.datePickerReducer.currentDate);

    const onCellClick = () => {
        // dispatch(open({
        //     initialData: info,
        //     initialRoomId: roomId,
        //     initialTime: time,
        //     initialDate: currentDate
        // }));
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