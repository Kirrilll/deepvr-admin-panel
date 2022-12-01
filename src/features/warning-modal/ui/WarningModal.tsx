import { Modal } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { selectWarningState } from '../redux/selectors';
import { removeWarning } from '../redux/slice';



const WarningModal: React.FC = () => {

    const warningState = useAppSelector(selectWarningState);
    const { isWarning, message, onOkActionPayload, onOkActionType } = warningState;

    const dispatch = useAppDispatch();
    const onClose = () => dispatch(removeWarning());
    const onOk = () => {
        dispatch({type: onOkActionType, payload: onOkActionPayload});
        onClose();
    }

    return (
        <Modal
            onOk={onOk}
            onCancel={onClose}
            open={isWarning}>
            <div>{message}</div>
        </Modal>
    )
}

export default WarningModal;