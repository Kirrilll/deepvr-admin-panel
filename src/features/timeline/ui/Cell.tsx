import React, { useMemo, useRef } from 'react';
import { open } from '../../../store/creation-booking-modal/slice';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import BookedCell from './BookedCell';
import { CellPivot } from '../../../entities/TimelineTypes';
import moment from 'moment';
import { selectSelectedCells } from '../redux/selectors';

type CellMode = 'selected' | 'selectable' | 'unselectable'

const selection_selectable_color = '#e9ffef';
const selected_border_color = '#962FF3';
const unselectable_background_color = '#888faa';

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
    const selectedDate = useAppSelector(state => state.datePickerReducer.currentDate);

    
    const selectedCells = useAppSelector(selectSelectedCells);

    const buildIsSelected = () => {
        
    };

    const onCellClick = () => {
        dispatch(open({
            initialData: null,
            initialRoomId: roomId,
            initialTime: time,
            initialDate: selectedDate
        }));
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