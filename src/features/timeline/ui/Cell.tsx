import React, { useMemo } from 'react';
import { open } from '../../booking-creator/redux/slice';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { CellPivot } from '../../../entities/TimelineTypes';
import { Button, Modal, Tooltip } from 'antd';
import useTimeChecker from '../../../common/hooks/useTimeChecker';
import CellContentFactory from '../../../common/utils/cell/CellContentFactory';
import CellModeFactory from '../../../common/utils/cell/CellModeFactory';
import { CellIndeficator } from '../redux/slice';
import { selectMode } from '../../selection/redux/selectors';

export const DEFAULT_CELL_CLASSNAME = 'table__cell';

interface CellProps {
    pivot: CellPivot | null,
    time: string,
    roomId: number
}

const Cell: React.FC<CellProps> = ({ pivot, time, roomId }) => {

    const dispatch = useAppDispatch();
    const selectedDate = useAppSelector(state => state.datePickerReducer.currentDate);

    const selectedCells = useAppSelector(state => state.selectionReducer.selectedCells);
    const modeType = useAppSelector(selectMode);
    
    const isAfter = useTimeChecker({ time: time, date: selectedDate });

    const cellid = useMemo<CellIndeficator>(
        () => ({ time: time, date: selectedDate.format('DD-MM-YYYY'), roomId: roomId }),
        [time, roomId, selectedDate.format('DD-MM-YYYY')]
    );

    

    const cellContent = useMemo(() => CellContentFactory.createContent(pivot), [pivot]);
    const cellMode = useMemo(() => CellModeFactory.createMode(
        !isAfter ? { type: 'overpast' } : {type: modeType, extraData: selectedCells},
        cellid,
        pivot,
        dispatch
    ), [isAfter, cellid, pivot, modeType, selectedCells]);


    const onButtonClick = () => {
        dispatch(open({
            initialTime: time,
            initialRoomId: roomId,
            initialDate: selectedDate,
            initialData: pivot?.order ?? null
        }))
    }

    return (
        <>
            <div style={{ position: 'relative' }}>
                <CreateOrderButton isVisible={cellMode.isLastSelected} onClick={onButtonClick} />
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