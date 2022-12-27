import { useState } from "react";
import { QrModal } from "../features/qr-modal/QrModal";

export const QrTestPage : React.FC = () => {
    const [qrResult, setQrResult] = useState('');

    const [modalState, setModalState] = useState(false);

    const openModal = () => setModalState(true);
    const closeModal = () => setModalState(false);

    const onSubmit = (res: string) => {
        setQrResult(res);
        closeModal();
    } 

    return (
        <>
            <QrModal 
                onSubmit={onSubmit} 
                onCancel={closeModal}
                isOpen={modalState}
            />
            <div>result: {qrResult}</div>
            <button onClick={openModal}> открыть QR сканнер </button>
        </>
    )
}