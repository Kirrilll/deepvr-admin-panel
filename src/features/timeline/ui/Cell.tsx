import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { CellPivot } from '../../../entities/TimelineTypes';
import { Button, Modal, Tooltip } from 'antd';
import useTimeChecker from '../../../common/hooks/useTimeChecker';
import CellContentFactory from '../../../common/utils/cell/CellContentFactory';
import CellModeFactory, { TimelineModeExtended } from '../../../common/utils/cell/CellModeFactory';
import { CellIndeficator } from '../redux/slice';
import { selectMode } from '../../selection/redux/selectors';
import { precreateOrder } from '../../booking-creator/redux/asyncActions';
import { selectIsOpen } from '../../booking-creator/redux/selectors';
import CellHelper from '../../../common/helpers/CellHelper';

export const DEFAULT_CELL_CLASSNAME = 'table__cell';

export interface CellProps {
    pivot: CellPivot | null,
    time: string,
    roomId: number
}


const Cell: React.FC<CellProps> = React.memo(({ pivot, time, roomId }) => {

    const dispatch = useAppDispatch();

    const selectedDate = useAppSelector(state => state.datePickerReducer.currentDate);
    const selectedCells = useAppSelector(state => state.selectionReducer.selectedCells);
    const modeType = useAppSelector(selectMode);
    const isCreating = useAppSelector(selectIsOpen);

    const isAfter = useTimeChecker({ time: time, date: selectedDate });

    const cellid = useMemo<CellIndeficator>(
        () => ({ time: time, date: selectedDate.format('YYYY-MM-DD'), roomId: roomId }),
        [time, roomId, selectedDate.format('YYYY-MM-DD')]
    );

    const cellContent = useMemo(() => CellContentFactory.createContent(pivot), [pivot]);
    const cellMode = useMemo(() => CellModeFactory.createMode(
        !isAfter ? { type: 'overpast' } : { type: modeType, extraData: selectedCells },
        cellid,
        pivot,
        dispatch
    ), [cellid, pivot, selectedCells, modeType, isAfter]);

    const isVisible = cellMode.isLastSelected && !isCreating;

    const onButtonClick = () => {
        dispatch(precreateOrder(selectedCells));
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
}, (prevProps: Readonly<CellProps>, nextProps: Readonly<CellProps>) => CellHelper.isPropsEquals(prevProps, nextProps))

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