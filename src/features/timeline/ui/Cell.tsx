import React, { useMemo } from 'react';
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

export const DEFAULT_CELL_CLASSNAME = 'table__cell';

interface CellProps{
    roomId: number,
    time: string,
    pivot: CellPivot | null
}

const Cell: React.FC<CellProps> = ({roomId, time, pivot}) => {
    const dispatch = useAppDispatch();

    const selectedDate = useAppSelector(state => state.datePickerReducer.currentDate);
    const selectedCells = useAppSelector(state => state.selectionReducer.selectedCells);
    const modeType = useAppSelector(selectMode);
    const isCreating = useAppSelector(selectIsOpen);

    const isAfter = useTimeChecker({ time: time, date: selectedDate });

    const cell = useMemo<CellView>(
        () => CellMapper.toCell(roomId, time, selectedDate, pivot),
        [time, roomId, selectedDate.format('YYYY-MM-DD'), pivot]
    );

    const cellContent = useMemo(() => CellContentFactory.createContent(pivot), [pivot]);
    const cellMode = useMemo(() => CellModeFactory.createMode(
        !isAfter ? { type: 'overpast' } : { type: modeType, extraData: selectedCells },
        cell,
        dispatch
    ), [cell.id, pivot, selectedCells, modeType, isAfter]);

    const isVisible = cellMode.isLastSelected && !isCreating;

    const onButtonClick = () => {
        dispatch(precreateOrder(selectedCells.map(cell => cell.id)));
    }

    return (
        <>
            <div style={{ position: 'relative' }}>
                <CreateOrderButton isVisible={isVisible} onClick={onButtonClick} />
                <div onClick={cellMode.onClick} className={cellMode.className}>
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