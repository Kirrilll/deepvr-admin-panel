import { Button, Checkbox, Col, Drawer, Form, Input, InputNumber, ModalProps, Radio, Row, Select, Slider, Space, Tag } from "antd";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../../app/store";
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
import CertificatesList from "./CertificateList";
import PersonalDataGroup from "./PersonalDataGroup";
import BookingGroup from "./BookingGroup";
import LoyaltyGroup from "./LoyaltyGroup";
import { type } from "@testing-library/user-event/dist/type";
import { selectCells } from "../../selection/redux/selectors";
import BookingMapper from "../../../common/mappers/BookingMapper";
import BookingHelper from "../../../common/helpers/BookingHelper";
import { selectGames } from "../../game/redux/selectors";
import { createOrder } from "../redux/asyncActions";

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
export const ORDER_ID_PATH = 'id';

export interface OrderFormState {
    [ORDER_ID_PATH]: number,
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

const OrderCreationForm: React.FC<{ onFinish: (form: OrderFormState) => void }> = ({ onFinish }) => {

    const [form] = useForm<OrderFormState>();
    const [client, setClient] = useState<Client | CreatedClient | null>(null);

    const { id, date } = useAppSelector(state => state.orderCreationReducer.initialData);
    const order = useAppSelector(selectInitialValues);
    const selectedCells = useAppSelector(selectCells);
    const games = useAppSelector(selectGames);

    useLayoutEffect(() => {
        form.setFieldsValue(order);
    }, [])

    useEffect(() => {
        const bookings = BookingMapper.toFormBookings(selectedCells);
        const prevBookings = form.getFieldValue(BOOKING_LIST_PATH);
        const joinedBookings = BookingHelper.bookingsRightJoin(prevBookings, bookings);
        form.setFieldsValue({ bookings: joinedBookings });
    }, [selectedCells]);


    return (
        <Form
            layout='vertical'
            className="sider-content-wrapper"
            form={form}
            onFinish={onFinish}
            preserve={false}
        >
            <Row justify='space-between' align='middle'>
                <Form.Item name={ORDER_ID_PATH}>
                    <div className="order-id">Заказа № {id}</div>
                </Form.Item>
                <Col span={12} >
                    <Form.Item
                        name={EMLOYEE_CODE_PATH}
                        rules = {[
                            {required: true, message: 'Не указан код сотрудника'}
                        ]}
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
                clientId={client?.id ?? null}
            />
            <CertificatesList globalForm={form} />
            {/* <Form.Item shouldUpdate>
                {
                    // () => <div>
                    //     Стоимость:
                    //     {BookingHelper.getAmount(games, form.getFieldValue(BOOKING_LIST_PATH) as FormBooking[])}
                    // </div>
                    // () => <div>
                    //     <div>
                    //         {(form.getFieldValue(BOOKING_LIST_PATH) as FormBooking[])?.map(booking => `${booking[GAME_PATH]} ${booking[GUEST_COUNT_PATH]}`)}
                    //     </div>
                    //     <div>{form.getFieldValue(PROMOCODE_PATH)}</div>
                    // </div>
                }
            </Form.Item> */}
            <Button style={{marginTop: '20px'}} className='default-btn' htmlType='submit'>
                Сохранить
            </Button>
        </Form >
    );
}

export default OrderCreationForm;

