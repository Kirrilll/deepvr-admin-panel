import React, { useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { Button, Modal, Tooltip } from 'antd';
import useTimeChecker from '../../../common/hooks/useTimeChecker';
import CellContentFactory from '../../../common/utils/cell/CellContentFactory';
import CellModeFactory from '../../../common/utils/cell/CellModeFactory';
import { selectMode } from '../../selection/redux/selectors';
import { precreateOrder } from '../../booking-creator/redux/asyncActions';
import { selectIsOpen } from '../../booking-creator/redux/selectors';
import { CellView, CellPivot } from '../../../entities/Cell';
import CellMapper from '../../../common/mappers/CellMapper';
import { TimelineOptions } from '../../../entities/TimelineOptions';
import { cellTypeSelector } from '../redux/selectors';
import StorageService from '../../../common/services/StorageService';

export const DEFAULT_CELL_CLASSNAME = 'table__cell';

type CellType = 'default' | 'simple'

interface CellProps {
    roomId: number,
    time: string,
    pivot: CellPivot | null
}

const Cell: React.FC<CellProps> = ({ roomId, time, pivot }) => {


    const dispatch = useAppDispatch();
    const selectedDate = useAppSelector(state => state.datePickerReducer.currentDate);
    const selectedCells = useAppSelector(state => state.selectionReducer.selectedCells);
    const modeType = useAppSelector(selectMode);
    const isCreating = useAppSelector(selectIsOpen);
    const cellType = useAppSelector(cellTypeSelector);
    const isMoving = useAppSelector(state => state.timeLineReducer.timelineAction === 'moving');

    const isAfter = useTimeChecker({ time: time, date: selectedDate });

    const cell = useMemo<CellView>(
        () => CellMapper.toCell(roomId, time, selectedDate, pivot),
        [time, roomId, selectedDate.format('YYYY-MM-DD'), pivot]
    );

    const cellContent = useMemo(() => CellContentFactory.createContent(pivot, cellType), [pivot, cellType]);
    const cellMode = useMemo(() => CellModeFactory.createMode(
        !isAfter ? { type: 'overpast' } : { type: modeType, extraData: selectedCells },
        cell,
        dispatch
    ), [cell.id, pivot, selectedCells, modeType, isAfter]);

    const onCellClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!isMoving) {
            cellMode.onClick(e);
        }
    }


    const isVisible = cellMode.isLastSelected && !isCreating;

    const onButtonClick = () => {
        dispatch(precreateOrder(selectedCells.map(cell => cell.id)));
    }


    const buildHeight = cellType == 'default' ? 145 : 85;


    return (
        <>
            <div style={{ position: 'relative', height: `${buildHeight}px` }}>
                <CreateOrderButton isVisible={isVisible} onClick={onButtonClick} />
                <div onClick={onCellClick} className={cellMode.className}>
                    {cellContent}
                </div>
            </div>
        </>


    )
}

interface CreateOrderButtonProps {
    onClick: () => void,
    isVisible: boolean
}

const CreateOrderButton: React.FC<CreateOrderButtonProps> = ({ isVisible, onClick }) => {
    return (
        isVisible
            ? <div style={{
                position: 'absolute',
                bottom: 0,
                transform: 'translate(-50%, 100%)',
                zIndex: 1000,
                left: 0,
            }}>
                <Button onClick={onClick} className='default-btn'>Создать бронь</Button>
            </div>
            : null
    );
}

export default Cell;