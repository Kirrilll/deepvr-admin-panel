import React from 'react';
import { EConfirmStatus } from '../types';


const ConfirmStatusTag: React.FC<{status: EConfirmStatus}> = ({status}) => {


    const _buildStyle = (): React.CSSProperties => {
        switch (status) {
            case EConfirmStatus.CONFIRM:
                return {
                    backgroundColor: '#EEF9F1',
                    border: '1px solid #65BD79',
                    color: '#65BD79'
                }
            case EConfirmStatus.CANCELED:
                return {
                    backgroundColor: '#FDF2F9',
                    border: '1px solid #EE6E7E',
                    color: '#EE6E7E'
                }
            default: {
                return {
                    backgroundColor: '#F0F8FE',
                    border: '1px solid #2F80ED',
                    color: '#2F80ED'
                }
            }
        }
    }

    return (
        <div style={_buildStyle()} className='booked-item__payment-status'>
            {status}
        </div>
    )
}

export default ConfirmStatusTag;