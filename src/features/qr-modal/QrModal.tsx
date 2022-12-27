import { Modal } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { OnResultFunction, QrReader } from "react-qr-reader";

interface IModalProps {
    onSubmit: (a: string) => void;
    onCancel: () => void;
    isOpen?: boolean;
}

const constratints : MediaTrackConstraints = {
    facingMode: 'environment'
};

export const QrModal: React.FC<IModalProps> = ({onSubmit, onCancel, isOpen = true}) => {

    const [qrRes, setRes] = useState('');

    const onResult = useCallback<OnResultFunction>((result, error) => {
        const text = result?.getText();
        if (text) setRes(text);
    }, [setRes]);

    useEffect(() => {
        setRes('');
    }, [isOpen]);

    const videoId = 'qr_reader_video';

    const closeCam = () => {
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
        }).then(stream => {
            stream.getTracks().forEach(track => {
                track.stop();
                track.enabled = false;
            });
            // @ts-ignore
            navigator.mediaSession.setCameraCative?.(false);
        });

        const video = document.getElementById(videoId) as HTMLVideoElement;
        const src = video.srcObject as MediaStream;
        src.getTracks().forEach((track: MediaStreamTrack) => {
            console.log(track);
            track.stop();
            track.enabled = false;
        });

        src.getTracks().forEach((track: MediaStreamTrack) => {
            console.log(track);
            track.stop();
            track.enabled = false;
        });
    };

    const _onSubmit = () => {
        closeCam();
        onSubmit(qrRes);
    };

    const _onCancel = () => {
        closeCam();
        onCancel();
    };

    return (
        <Modal 
            open={isOpen}
            onOk={_onSubmit}
            onCancel={_onCancel}
            title='Прочитать QR код'
        >
            {!!isOpen &&
                <QrReader 
                    onResult={isOpen ? onResult : undefined}
                    constraints={constratints}
                    containerStyle={{background: '#000'}}
                    videoId={videoId}
                />
            }
            <p>
                <span>QR код: {qrRes}</span>
            </p>
        </Modal>
    );
};