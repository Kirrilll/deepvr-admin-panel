import { Form, FormListFieldData, Input, Row, Select } from "antd";
import { BookingCreation } from "../../../entities/OrderCreation";
import REMOVE_ICON from '../../../assets/remove.svg';
import GUEST_ICON from '../../../assets/person.svg';
import TIME_ICON from '../../../assets/clock.svg';
import { Booking, GAME_PATH, GUEST_COUNT_PATH, ROOM_PATH, TIME_PATH } from "./OrderCreateForm";
import { LabeledValue } from "antd/lib/select";
import { GameValue } from "../../../entities/GameView";
import { useAppSelector } from "../../../app/store";
import { buildGamesByRoomSelector, buildRoomByIdSelector, selectRooms } from "../../game/redux/selectors";
import { useMemo } from "react";
import GameMapper from "../../../common/mappers/GameMapper";
import RoomMapper from "../../../common/mappers/RoomMapper";


export type FormListBooking = FormListFieldData & {roomId: number, time: string}

interface BookingFormProps {
    booking: Booking,
    field: FormListFieldData
    color: string,
    orderId: number
}


const BookingForm: React.FC<BookingFormProps> = ({ booking, color, orderId, field }) => {
    const games = useAppSelector(buildGamesByRoomSelector(booking[ROOM_PATH]));
    const rooms = useAppSelector(selectRooms);
    const room = useAppSelector(buildRoomByIdSelector(booking[ROOM_PATH]));
    const gamesOptions = useMemo(() => GameMapper.gamesToValues(games), [games])
    const roomsOptions = useMemo(() => RoomMapper.gamesToValues(rooms), [rooms]);
    
    console.log(room);


    return (
        <div className="booking-form">
            <div style={{ backgroundColor: color }} className="booking-form__header">
                <Row justify='space-between' align='middle' style={{ height: '100%' }}>
                    <div>Заказ {orderId}</div>
                    <img src={REMOVE_ICON} />
                </Row>
            </div>
            <div className="booking-form__wrapper">
                <Form.Item
                    key = {field.key + '1'}
                    name={[field.name, ROOM_PATH]}
                >
                    <Select
                        options={roomsOptions}
                        labelInValue
                        style={{ height: '40px' }}
                        placeholder='Зал'
                        disabled
                        popupClassName={'first-plan-object'}
                    />
                </Form.Item>
                <Form.Item
                    key = {field.key + '2'}
                    name={[field.name, GAME_PATH]}
                >
                    <Select
                        labelInValue
                        options={gamesOptions}
                        
                        style={{ height: '40px' }}
                        placeholder='Игра'
                        popupClassName={'first-plan-object'}
                    />
                </Form.Item>
                <Form.Item
                    key = {field.key + '3'}
                    name={[field.name, GUEST_COUNT_PATH]}
                >
                    <Input
                        bordered={false}
                        prefix={<img src={GUEST_ICON} />}
                        className='default-input' />
                </Form.Item>
                <Form.Item
                    key = {field.key + '4'}
                    name={[field.name, TIME_PATH]}
                >
                    <Input
                        disabled
                        bordered={false}
                        prefix={<img src={TIME_ICON} />}
                        className='default-input' />
                </Form.Item>
            </div>
        </div>
    );
}

export default BookingForm;