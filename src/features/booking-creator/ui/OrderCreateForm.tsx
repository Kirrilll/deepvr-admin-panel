import { Button, Checkbox, Col, Drawer, Form, Input, InputNumber, ModalProps, Radio, Row, Select, Slider, Space, Tag } from "antd";
import React, { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/store";
import { PlusOutlined, DeleteOutlined, } from '@ant-design/icons';
import BookingModalService from "../../../services/BookingModalService";
import { LabeledValue } from "antd/lib/select";
import Client, { ClientValue } from "../../../entities/Client";
import { useGetGamesQuery, useGetRoomsQuery, useGetWorkingShiftQuery } from "../../../repositories/TimelineApi";
import GamesService from "../../../services/GamesService";
import { Room } from "../../../entities/Room";
import { createBooking, fetchBookings } from "../redux/asyncActions";
import { close } from "../redux/slice";
import MathHelper from "../../../common/helpers/MathHelper";
import { FetchingStatus } from "../../timeline/redux/slice";
import CustomDatePicker from "../../date-picker/ui/CustomDatePicker";
import Layout from "antd/lib/layout/layout";
import OrderMapper from "../../../common/mappers/OrderMapper";
import { selectComplexOrder } from "../redux/selectors";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import DateRange from "../../date-picker/ui/DateRange";
import { selectDate } from "../../date-picker/redux/slice";
import BookingForm from "./BookingForm";
import ColorPool from "../../../common/utils/color/ColorPool";
import { BookingCreation } from "../../../entities/OrderCreation";
import useDebounceSearch from "../../../common/hooks/useDebounceSearch";
import ClientMapper from "../../../common/mappers/ClientMapper";
import ADD_ICON from '../../../assets/add.svg';
import { QrcodeOutlined } from '@ant-design/icons';
import CertificatesList from "./CertificateList";
import PersonalDataGroup from "./PersonalDataGroup";
import BookingGroup from "./BookingGroup";
import LoyaltyGroup from "./LoyaltyGroup";

interface FormState {
    employeeCode: string,
    confirmStatus: number,
    paymentStatus: number,
    phone: string,
    date: moment.Moment,
    bookings: FormBooking[],
    promocode?: string,
    useBonus: boolean
}


interface FormBooking {
    roomdId: number,
    gameId: number,
    time: string,
    guestCount: number
}

const initialState: FormState = {
    employeeCode: '',
    confirmStatus: 0,
    paymentStatus: 0,
    phone: '',
    date: moment(),
    bookings: [],
    useBonus: false
}

export const EMLOYEE_CODE_PATH = 'employeeCode';
export const PAYMENT_STATUS_PATH = 'paymentStatus';
export const CONFRIM_STATUS_PATH = 'confirmStatus';
export const DATE_PICKER_PATH = 'datePicker';
export const PHONE_PICKER_PATH = 'phonePicker';
export const BOOKING_LIST_PATH = 'bookings';
export const PROMOCODE_PATH = 'pronocode';
export const BONUS_PATH = 'bonuses';
export const NAME_PATH = 'name'
export const IS_USE_BONUSES_PATH = 'isBonuses';
export const CERTIFACATES_PATH = 'certificates';

const OrderCreationForm: React.FC = () => {

    const dispatch = useAppDispatch();
    const [form] = useForm<FormState>();

    const [client, setClient] = useState<Client | null>(null);

    const order = useAppSelector(selectComplexOrder);

    const isOrderWithId = order?.id != null;

    const onChangeBonus = (value: number) => {
        form.setFieldValue(BONUS_PATH, value);
    }



    useEffect(() => {
        // console.log(order);
        form.setFieldValue(BOOKING_LIST_PATH, order?.bookings ?? []);
    }, [order])
    // const onFinish = (values: any) => {
    //     dispatch(createBooking({
    //         certificates: null,
    //         employee_code: '735',
    //         date: values.datePicker.format('YYYY-MM-DD'),
    //         status: values.confirmStatus.toString(),
    //         phone: values.phoneSelect.value,
    //         token: '6bc8a47477b1427a6ae7f4e13789aea32c77ec29',
    //         promo_code: values.promoCode ?? '',
    //         comment: '',
    //         bonus: '',
    //         name: values.name,
    //         bookings: values.bookings
    //             .map((booking: { room: LabeledValue, game: LabeledValue, time: LabeledValue, guestCount: string }) => ({
    //                 id: null,
    //                 time: booking.time.value,
    //                 guest_quantity: Number.parseInt(booking.guestCount),
    //                 room_id: Number.parseInt(booking.room.value as string),
    //                 game_id: Number.parseInt(booking.game.value as string)
    //             }))

    //     }));
    // }




    // const onChange = (value: LabeledValue | LabeledValue[]) => {
    //     const clientValue = value as ClientValue;
    //     const client = data.find(client => client.id === Number.parseInt(clientValue.key ?? ''));
    //     form.setFieldValue(NAME_)
    // }

    // const getSelectedRoom = (field: any): Room | null => {
    //     const bookings = [...form.getFieldValue('bookings')];
    //     const currBooking = bookings[field.key];
    //     const currSelectedRoomValue = currBooking?.room;
    //     const currSelectedRoom = roomsQuery.data?.find((room) => room.id == currSelectedRoomValue?.key);
    //     return currSelectedRoom ?? null;
    // }

    // const buildOnSelectRoom = (field: any) => (room: LabeledValue) => {
    //     const bookings = [...form.getFieldValue('bookings')];
    //     const currBooking = bookings[field.key];
    //     bookings[field.key] = { ...currBooking, game: null };
    //     form.setFieldValue('bookings', bookings);
    // }

    // const isRoomSelected = (field: any) => {
    //     return form.getFieldValue('bookings')[field.key]?.room?.key !== undefined;
    // }

    // const isTimesLoading = bookingsFetchingStatus == FetchingStatus.LOADING && workingShiftQuery.isLoading;

    // const getAvailableTime = (field: any) => {
    //     const room = getSelectedRoom(field);
    //     //const bookedTime = OrderMapper.getBookedTimeByRoom(bookings, room?.id ?? null);
    //     const bookedTime = ['12:00', '13:00'];
    //     return MathHelper.getArrDifference(bookedTime, workingShiftQuery.data?.time ?? []);
    // }

    // const buildHandleChange = (field: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { value: inputValue } = e.target;
    //     const reg = /^-?\d*(\.\d*)?$/;
    //     if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
    //         const bookings = [...form.getFieldValue('bookings')];
    //         const currBooking = bookings[field.key];
    //         bookings[field.key] = { ...currBooking, guest_count: inputValue };
    //         form.setFieldValue('bookings', bookings);
    //     }
    // };


    // const buildHandleBlur = (field: any) => () => {
    //     const bookings = [...form.getFieldValue('bookings')];
    //     const currBooking = bookings[field.key];
    //     const guestCountValue = currBooking?.guestCount ?? 1;
    //     let valueTemp = guestCountValue;
    //     if (guestCountValue.charAt(guestCountValue.length - 1) === '.' || guestCountValue === '-') {
    //         valueTemp = guestCountValue.slice(0, -1);
    //     }
    //     bookings[field.key] = { ...currBooking, guest_count: valueTemp.replace(/0*(\d+)/, '$1') };
    //     form.setFieldValue('bookings', bookings);
    // };


    return (
        <Form
            layout='vertical'
            className="sider-content-wrapper"
            form={form}
            onFinish={(values) => console.log(values)}
        >
            <Row justify='space-between'>
                {isOrderWithId ? <div>Заказа № {order.id}</div> : null}
                <Col span={12} >
                    <Form.Item
                        name={EMLOYEE_CODE_PATH}
                    >
                        <div className="gradient-border">
                            <Input
                                style={{ borderRadius: '14px' }}
                                className="default-input employee-input"
                                placeholder="Код сотрудника"
                                bordered={false} />
                        </div>

                    </Form.Item>
                </Col>

            </Row>
            <Form.Item
                name={CONFRIM_STATUS_PATH}
                label={<div className="creation-form-label">Статус заказа:</div>}>
                <Radio.Group style={{ width: '100%' }}>
                    <Row gutter={[20, 0]}>
                        <Col span={8}>
                            <Radio.Button value={1}>Подтвержедено</Radio.Button>
                        </Col>
                        <Col span={8}>
                            <Radio.Button value={0}>Не подтвержедено</Radio.Button>
                        </Col>
                        <Col span={8}>
                            <Radio.Button value={-1}>Отменено</Radio.Button>
                        </Col>
                    </Row>

                </Radio.Group>
            </Form.Item>
            <Form.Item
                label={<div className="creation-form-label">Статус оплаты:</div>}
                name={PAYMENT_STATUS_PATH}>
                <Radio.Group style={{ width: '100%' }}>
                    <Row gutter={[20, 20]}>
                        <Col span={8}>
                            <Radio.Button value={1}>Оплачено</Radio.Button>
                        </Col>
                        <Col span={8}>
                            <Radio.Button value={0}>Не оплачено</Radio.Button>
                        </Col>
                    </Row>
                </Radio.Group>
            </Form.Item>
            <PersonalDataGroup
                globalForm={form}
                setClient={setClient}
                client={client}
            />
            <BookingGroup
                globalForm={form}
                order={order} />
            <LoyaltyGroup
                globalForm={form}
                isIdentified = {client != null}
            />
            <CertificatesList globalForm={form} />

            <Button htmlType='submit'>
                Сохранить
            </Button>
        </Form >
    );
}

export default OrderCreationForm;

