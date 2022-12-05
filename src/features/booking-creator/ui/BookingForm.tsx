import { Button, Form, FormListFieldData, Input, InputNumber, Row, Select } from "antd";
import REMOVE_ICON from '../../../assets/remove.svg';
import GUEST_ICON from '../../../assets/person.svg';
import TIME_ICON from '../../../assets/clock.svg';
import { FormBooking, BOOKING_LIST_PATH, GAME_PATH, GUEST_COUNT_PATH, ROOM_PATH, TIME_PATH } from "./OrderCreateForm";

import { useAppDispatch, useAppSelector } from "../../../app/store";
import { buildGamesByRoomSelector, buildRoomByIdSelector, selectRooms } from "../../game/redux/selectors";
import { useMemo } from "react";
import GameMapper from "../../../common/mappers/GameMapper";
import RoomMapper from "../../../common/mappers/RoomMapper";
import { FormInstance } from "antd/es/form/Form";
import { unselectCell } from "../../selection/redux/slice";
import BookingMapper from "../../../common/mappers/BookingMapper";



interface BookingFormProps {
    booking: FormBooking,
    field: FormListFieldData
    color: string,
    date: moment.Moment
    orderId: number,
}


const BookingForm: React.FC<BookingFormProps> = ({ color, orderId, field, date, booking }) => {
    const games = useAppSelector(buildGamesByRoomSelector(booking[ROOM_PATH]));
    const rooms = useAppSelector(selectRooms);
    // const room = useAppSelector(buildRoomByIdSelector(booking[ROOM_PATH]));
    const gamesOptions = useMemo(() => GameMapper.gamesToValues(games), [games])
    const roomsOptions = useMemo(() => RoomMapper.gamesToValues(rooms), [rooms]);

    const dispatch = useAppDispatch();
    const onOnDeleteItem = () => {
        dispatch(unselectCell(BookingMapper.toCell(booking, date.format('YYYY-MM-DD'))))
    }

    return (
        <div className="booking-form">
            <div style={{ backgroundColor: color }} className="booking-form__header">
                <Row justify='space-between' align='middle' style={{ height: '100%' }}>
                    <div>Заказ {orderId}</div>
                    <div style={{ cursor: 'pointer' }} onClick={onOnDeleteItem}>
                        <img src={REMOVE_ICON} />
                    </div>

                </Row>
            </div>
            <div className="booking-form__wrapper">
                <Form.Item
                    initialValue={booking[ROOM_PATH]}
                    key={field.key + '1'}
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
                    key={field.key + '2'}
                    name={[field.name, GAME_PATH]}
                    initialValue={booking[GAME_PATH]}
                    rules = {[
                        {required: true}
                    ]}
                >
                    <Select
                        // labelInValue
                        options={gamesOptions}
                        style={{ height: '40px' }}
                        placeholder='Игра'
                        popupClassName={'first-plan-object'}
                    />
                </Form.Item>
                <Form.Item
                    initialValue={booking[GUEST_COUNT_PATH]}
                    key={field.key + '3'}
                    name={[field.name, GUEST_COUNT_PATH]}
                    rules = {[
                        // {type: 'number', max: 10},
                        {required: true, message: 'Это поле обязательно'},
                    ]}
                >
                    <Input
                        bordered={false}
                        prefix={<img src={GUEST_ICON} />}
                        className='default-input' />
                </Form.Item>
                <Form.Item
                    initialValue={booking[TIME_PATH]}
                    key={field.key + '4'}
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