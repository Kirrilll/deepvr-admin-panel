import { Button, Checkbox, Col, Drawer, Form, Input, InputNumber, ModalProps, Radio, Row, Select, Slider, Space, Tag } from "antd";
import React, { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/store";
import { PlusOutlined, DeleteOutlined, } from '@ant-design/icons';
import BookingModalService from "../../../services/BookingModalService";
import { LabeledValue } from "antd/lib/select";
import Client, { ClientValue, CreatedClient } from "../../../entities/Client";
import { Room } from "../../../entities/Room";
import { close } from "../redux/slice";
import MathHelper from "../../../common/helpers/MathHelper";
import { FetchingStatus } from "../../timeline/redux/slice";
import CustomDatePicker from "../../date-picker/ui/CustomDatePicker";
import Layout from "antd/lib/layout/layout";
import OrderMapper from "../../../common/mappers/OrderMapper";
import { selectInitialValues } from "../redux/selectors";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import DateRange from "../../date-picker/ui/DateRange";
import { selectDate } from "../../date-picker/redux/slice";
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
import { type } from "@testing-library/user-event/dist/type";
import { selectCells } from "../../selection/redux/selectors";
import BookingMapper from "../../../common/mappers/BookingMapper";
import BookingHelper from "../../../common/helpers/BookingHelper";

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
export const ROOM_PATH = 'roomId';
export const GAME_PATH = 'gameId';
export const TIME_PATH = 'time';
export const GUEST_COUNT_PATH = 'guestCount';


export interface FormState {
    [EMLOYEE_CODE_PATH]: string,
    [CONFRIM_STATUS_PATH]: number,
    [PAYMENT_STATUS_PATH]: number,
    [PHONE_PICKER_PATH]: string,
    [NAME_PATH]: string,
    [DATE_PICKER_PATH]: moment.Moment,
    [BOOKING_LIST_PATH]: FormBooking[],
    [PROMOCODE_PATH]?: string,
    [IS_USE_BONUSES_PATH]: boolean,
    [CERTIFACATES_PATH]: string[]
}


export interface FormBooking {
    [ROOM_PATH]: number,
    [GAME_PATH]: number | null,
    [TIME_PATH]: string,
    [GUEST_COUNT_PATH]: number | null,
}

const OrderCreationForm: React.FC = () => {
    const [form] = useForm<FormState>();
    const [client, setClient] = useState<Client | CreatedClient | null>(null);
    const selectedCells = useAppSelector(selectCells);

    const { id, date } = useAppSelector(state => state.orderCreationReducer.initialData);
    const order = useAppSelector(selectInitialValues);

    useEffect(() => {
        form.setFieldValue(BOOKING_LIST_PATH, order[BOOKING_LIST_PATH]);
    }, [])

    useEffect(() => {
        const bookings = BookingMapper.toFormBookings(selectedCells);
        //console.log(bookings);
        const prevBookings = form.getFieldValue(BOOKING_LIST_PATH);
        const joinedBookings = BookingHelper.bookingsRightJoin(prevBookings, bookings);
        // console.log(joinedBookings);
        form.setFieldValue(BOOKING_LIST_PATH, joinedBookings);
    }, [selectedCells]);

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
            preserve={false}
            initialValues={order}

        >
            <Row justify='space-between' align='middle'>
                <div className="order-id">Заказа № {id}</div>
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
            />
            <BookingGroup
                globalForm={form}
                orderId={id}
                date={date}
            />
            <LoyaltyGroup
                globalForm={form}
                clientId = {client?.id ?? null}
            />
            <CertificatesList globalForm={form} />

            <Button htmlType='submit'>
                Сохранить
            </Button>
        </Form >
    );
}

export default OrderCreationForm;

