import React, { useMemo, useRef } from 'react';
import { open } from '../../../store/creation-booking-modal/slice';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import BookedCell from './BookedCell';
import { CellPivot } from '../../../entities/TimelineTypes';

type CellMode = 'selected' | 'selectable' | 'unselectable'



interface CellProps {
    pivot: CellPivot | null,
    time: string,
    roomId: number
}

//Является по сути factory, 
//Если ячейка selectable
//Ячейка сама определяет является ли она ВЫБИРАЕМОЙ
const Cell: React.FC<CellProps> = ({pivot, time, roomId}) => {

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
                pivot == null
                    ? null
                    : <BookedCell  pivot={pivot}/>
                  
            }
        </div>

    )
}

export default Cell;