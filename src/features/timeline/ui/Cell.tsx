import React, { useEffect, useMemo, useRef, useState } from 'react';
import { open } from '../../../store/creation-booking-modal/slice';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import BookedCell from './BookedCell';
import { CellPivot } from '../../../entities/TimelineTypes';
import moment from 'moment';
import { selectedCellsSelector, selectSelectedCells } from '../redux/selectors';
import { selectCell, unselectCell } from '../redux/slice';
import TimeHelper from '../../../common/helpers/TimeHelper';
import { Button, Tooltip } from 'antd';

type CellMode = 'selected' | 'selectable' | 'unselectable'

interface CellProps {
    pivot: CellPivot | null,
    time: string,
    roomId: number
}


interface CellAttr {
    className: string,
    onClick: () => void
}

//Является по сути factory, 
//Если ячейка selectable
//Ячейка сама определяет является ли она ВЫБИРАЕМОЙ
const Cell: React.FC<CellProps> = ({ pivot, time, roomId }) => {

    const dispatch = useAppDispatch();
    const selectedDate = useAppSelector(state => state.datePickerReducer.currentDate);
    const modeType = useAppSelector(state => state.timeLineReducer.mode.type);
    const selectedCells = useAppSelector(selectedCellsSelector);
    const [isAfter, setAfter] = useState(false);

    //Сделать фабрику

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         const currMoment = moment();
    //         if (selectedDate.isBefore(currMoment)) {
    //             setAfter(true);
    //         }
    //         else if (currMoment.hours()) {
    //             console.log(currMoment.hour());
    //         }
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, [selectedDate])


    const buildSelectionState = (): CellAttr => {
        const defaultClassName = 'table__cell';
        if (~selectedCells.findIndex(cell => cell.roomId === roomId && cell.time === time && cell.date == selectedDate.format('DD-MM-YYYY'))) {
            return ({
                className: defaultClassName + ' selected',
                onClick: () => dispatch(unselectCell({
                    time: time,
                    roomId: roomId,
                    date: selectedDate.format('DD-MM-YYYY')
                }))
            })
        }
        else if (selectedCells.map(cell => TimeHelper.isNextOrPrev(time, cell.time) && selectedDate.format('DD-MM-YYYY') == cell.date)
            .reduce((prev, next) => prev || next)) {
            return ({
                className: defaultClassName + ' selectable',
                onClick: () => dispatch(selectCell({
                    time: time,
                    roomId: roomId,
                    date: selectedDate.format('DD-MM-YYYY')
                }))
            })
        }
        return ({
            className: defaultClassName + ' unselectable',
            onClick: () => { }
        })
    }

    const buildCellState = (): CellAttr => {
        if (isAfter) {
            return ({
                className: 'table__cell unselectable--idle',
                onClick: () => { }
            })
        }
        else if (modeType == 'selection') {
            return buildSelectionState();
        }
        return ({
            className: 'table__cell',
            onClick: () => dispatch(selectCell({
                time: time,
                roomId: roomId,
                date: selectedDate.format('DD-MM-YYYY')
            }))
        })
    }

    const isLastSelected = () => {
        if (selectedCells.length == 0) return false;
        const lastSelected = selectedCells[selectedCells.length - 1];
        return lastSelected.time == time && lastSelected.roomId == roomId;

    }


    const onButtonClick = () => {
        dispatch(open({
            initialTime: time,
            initialRoomId: roomId,
            initialDate: selectedDate,
            initialData: pivot?.order ?? null
        }))
    }

    return (
        <div  style={{ position: 'relative' }}>
            <div style={{
                position: 'absolute',
                bottom: 0,
                transform: 'translate(-50%, 100%)',
                zIndex: 1000,
                left: 0,
                display: `${isLastSelected() ? 'block': 'none'}`
            }}>
                <Button onClick={onButtonClick} className='default-btn'>Создать бронь</Button>
            </div>
            <div {...buildCellState()}>
                {
                    pivot == null
                        ? null
                        : <BookedCell pivot={pivot} />

                }
            </div>

        </div>
    )
}

export default Cell;