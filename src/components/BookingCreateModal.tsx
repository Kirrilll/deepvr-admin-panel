import { Button, Col, Drawer, Form, Input, InputNumber, ModalProps, Radio, Row, Select, Space } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { close } from "../store/creation-booking-modal/slice";
import { useAppDispatch, useAppSelector } from "../app/store";
import { PlusOutlined, DeleteOutlined, } from '@ant-design/icons';
import DebounceSelect, { UserValue } from "./DebounceSelect";
import BookingModalService from "../services/BookingModalService";
import { LabeledValue } from "antd/lib/select";
import { ClientValue } from "../entities/Client";
import { useGetGamesQuery, useGetRoomsQuery, useGetWorkingShiftQuery } from "../repositories/TimelineApi";
import GamesService from "../services/GamesService";
import { Room } from "../entities/Room";
import { createBooking, fetchBookings } from "../store/creation-booking-modal/asyncActions";
import OrderMapper from "../common/mappers/OrderMapper";
import MathHelper from "../common/helpers/MathHelper";
import { FetchingStatus } from "../features/timeline/redux/slice";
import CustomDatePicker from "../features/timeline/ui/CustomDatePicker";
import Layout from "antd/lib/layout/layout";


const Sider = Layout;

export interface OrderView {
    date: moment.Moment,
    confirmStatus: number,
    phone: string,
    name: string,
    bookings: BookingFormState[]
}

interface BookingFormState {
    time: string,
    guest_quantity: number,
    roomId: number,
    gameId: number
}

const BookingCreateModal: React.FC = () => {

    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [date, setDate] = useState<moment.Moment | null>(null);
    const { isOpen,
        initialData,
        initialDate,
        initialRoomId,
        initialTime,
        bookingsFetchingStatus,
        bookings,
        createBookingStatus
    } = useAppSelector(state => state.modalReducer);

    const service = useMemo(() => new BookingModalService(), [])
    const onFinish = (values: any) => {
        dispatch(createBooking({
            certificates: null,
            employee_code: '735',
            date: values.datePicker.format('YYYY-MM-DD'),
            status: values.confirmStatus.toString(),
            phone: values.phoneSelect.value,
            token: '6bc8a47477b1427a6ae7f4e13789aea32c77ec29',
            promo_code: values.promoCode ?? '',
            comment: '',
            bonus: '',
            name: values.name,
            bookings: values.bookings
                .map((booking: { room: LabeledValue, game: LabeledValue, time: LabeledValue, guestCount: string }) => ({
                    id: null,
                    time: booking.time.value,
                    guest_quantity: Number.parseInt(booking.guestCount),
                    room_id: Number.parseInt(booking.room.value as string),
                    game_id: Number.parseInt(booking.game.value as string)
                }))

        }));
    }
    const onCancel = () => dispatch(close());

    useEffect(() => {
        if (createBookingStatus == FetchingStatus.SUCCESSFULL) {
            dispatch(close());
        }
    }, [createBookingStatus])

    const roomsQuery = useGetRoomsQuery();
    const gameQuery = useGetGamesQuery();
    const workingShiftQuery = useGetWorkingShiftQuery();

    const validateMessages = {
        required: 'Это поле обязательно',
    };

    const initialValues: any = {
        datePicker: initialDate,
        phoneSelect: initialData?.phone ?? null,
        paymentStatus: 0,
        confirmStatus: 0,
        bookings: [
            {
                room: {
                    value: initialRoomId,
                    label: roomsQuery.data?.find(room => room.id === initialRoomId)?.title ?? '',
                    key: initialRoomId?.toString()
                },
                time: {
                    value: initialTime,
                    label: initialTime,
                    key: initialTime
                },
            }
        ]
    }


    useEffect(() => {
        dispatch(fetchBookings(form.getFieldValue('datePicker')));
    }, [date]);


    const onSelectPhone = (client: ClientValue | ClientValue[]) => {
        //Выбрать телефон
        form.setFieldValue('phoneSelect', client);
        console.log(client);
        const singleClient = client
        const nameFieldValue = form.getFieldValue('name');
        form.setFieldValue('name', 'sjdjsdd');
    }

    const getSelectedRoom = (field: any): Room | null => {
        const bookings = [...form.getFieldValue('bookings')];
        const currBooking = bookings[field.key];
        const currSelectedRoomValue = currBooking?.room;
        const currSelectedRoom = roomsQuery.data?.find((room) => room.id == currSelectedRoomValue?.key);
        return currSelectedRoom ?? null;
    }

    const onDateSelect = (date: moment.Moment) => {
        setDate(date);
        form.setFieldValue('datePicker', date);
    }

    const buildOnSelectRoom = (field: any) => (room: LabeledValue) => {
        const bookings = [...form.getFieldValue('bookings')];
        const currBooking = bookings[field.key];
        bookings[field.key] = { ...currBooking, game: null };
        form.setFieldValue('bookings', bookings);
    }

    const isRoomSelected = (field: any) => {
        return form.getFieldValue('bookings')[field.key]?.room?.key !== undefined;
    }

    const isTimesLoading = bookingsFetchingStatus == FetchingStatus.LOADING && workingShiftQuery.isLoading;

    const getAvailableTime = (field: any) => {
        const room = getSelectedRoom(field);
        //const bookedTime = OrderMapper.getBookedTimeByRoom(bookings, room?.id ?? null);
        const bookedTime = ['12:00', '13:00'];
        return MathHelper.getArrDifference(bookedTime, workingShiftQuery.data?.time ?? []);
    }

    const buildHandleChange = (field: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            const bookings = [...form.getFieldValue('bookings')];
            const currBooking = bookings[field.key];
            bookings[field.key] = { ...currBooking, guest_count: inputValue };
            form.setFieldValue('bookings', bookings);
        }
    };


    const buildHandleBlur = (field: any) => () => {
        const bookings = [...form.getFieldValue('bookings')];
        const currBooking = bookings[field.key];
        const guestCountValue = currBooking?.guestCount ?? 1;
        let valueTemp = guestCountValue;
        if (guestCountValue.charAt(guestCountValue.length - 1) === '.' || guestCountValue === '-') {
            valueTemp = guestCountValue.slice(0, -1);
        }
        bookings[field.key] = { ...currBooking, guest_count: valueTemp.replace(/0*(\d+)/, '$1') };
        form.setFieldValue('bookings', bookings);
    };

    return (
        <Form
            initialValues={initialValues}
            validateMessages={validateMessages}
            preserve={false}
            onFinish={onFinish}
            form={form}>
            <Form.Item name='paymentStatus'>
                <Radio.Group >
                    <Radio.Button value={1}>Оплачено</Radio.Button>
                    <Radio.Button value={0}>Не оплачено</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item name='confirmStatus'>
                <Radio.Group>
                    <Radio.Button value={1}>Подтвержедено</Radio.Button>
                    <Radio.Button value={0}>Не подтверждено</Radio.Button>
                    <Radio.Button value={-1}>Отменено</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item initialValue={initialData?.phone ?? null} name={'phoneSelect'}>
                <DebounceSelect
                    value={form.getFieldValue('phoneSelect')}
                    placeholder="Введите номер телефона"
                    fetchOptions={service.fetchClientsByPhone}
                    onChange={onSelectPhone}
                />
            </Form.Item>
            <Form.Item name='name' required label={<div>Имя</div>}>
                <Input />
            </Form.Item>
            <Form.Item initialValue={initialDate} name="datePicker">
                <CustomDatePicker
                    onChange={onDateSelect}
                    value={form.getFieldValue('datePicker')}
                    popupClassName='first-plan-object'
                />
            </Form.Item>
            <Row>
                <Form.Item name='promoCode' required label={<div>Промокоды</div>}>
                    <Input />
                </Form.Item>
                <Button>Применить</Button>
            </Row>
            <Form.List name={'bookings'}>
                {(fields, { add, remove }) => (
                    <div>
                        {fields.map((field, index) => (
                            <Row justify='space-between'>
                                <Space
                                    direction='vertical'
                                    style={{ marginBottom: '10px' }}
                                    key={field.key} size='small'
                                    align='start'>
                                    <Form.Item
                                        noStyle
                                    // shouldUpdate={(prevValues, curValues) =>
                                    //     prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                    // }
                                    >
                                        <Form.Item
                                            {...field}
                                            label="Зал"
                                            name={[field.key, 'room']}
                                            rules={[{ required: true, message: 'Выбор зала обязателен' }]}
                                        >
                                            <Select
                                                labelInValue
                                                onSelect={buildOnSelectRoom(field)}
                                                popupClassName={'first-plan-object'}
                                                options={roomsQuery.data?.map<LabeledValue>((room) => {
                                                    return ({
                                                        value: room.id,
                                                        label: room.title,
                                                        key: room.id.toString()
                                                    })
                                                })}
                                                loading={roomsQuery.isLoading} />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            dependencies={[['bookings', field.key, 'room']]}
                                            label="Игра"
                                            name={[field.key, 'game']}
                                            rules={[{ required: true, message: 'Не указана игра' }]}
                                        >
                                            <Select
                                                placement='bottomRight'
                                                labelInValue
                                                showSearch
                                                filterOption={(input, option) => (option?.label ?? '').toString().includes(input)}
                                                loading={gameQuery.isLoading}
                                                popupClassName={'first-plan-object'}
                                                options={GamesService.filterByRoom(
                                                    getSelectedRoom(field)?.id ?? null,
                                                    gameQuery.data ?? []
                                                )?.map<LabeledValue>((game) => {
                                                    return ({
                                                        value: game.id,
                                                        label: game.title,
                                                        key: game.id.toString()
                                                    })
                                                })}
                                            >

                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            dependencies={[['bookings', field.key, 'room']]}
                                            label="Кол-во человек"
                                            name={[field.name, 'guestCount']}
                                            rules={[
                                                { required: true, message: 'Не указано кол-во людей' },
                                                {
                                                    warningOnly: true,
                                                    message: `Максимальное кол-во игроков - ${getSelectedRoom(field)?.guest_max}`,
                                                    validator: (_, value: number) => {
                                                        if (value > getSelectedRoom(field)!.guest_max) {
                                                            return Promise.reject()
                                                        }
                                                        return Promise.resolve();
                                                    }
                                                }
                                            ]}
                                        >
                                            <Input
                                                min={1}
                                                size='large'
                                                onChange={buildHandleChange(field)}
                                                onBlur={buildHandleBlur(field)}
                                                disabled={!isRoomSelected(field)}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            dependencies={[['bookings', field.key, 'room']]}
                                            label="Доступное время"
                                            name={[field.key, 'time']}>
                                            <Select
                                                labelInValue
                                                popupClassName={'first-plan-object'}
                                                loading={isTimesLoading}
                                                options={getAvailableTime(field).map<LabeledValue>(time => ({
                                                    label: time,
                                                    key: time,
                                                    value: time
                                                }))}
                                                disabled={!isRoomSelected(field)}
                                            />
                                        </Form.Item>
                                    </Form.Item>
                                </Space>
                                <DeleteOutlined onClick={() => remove(field.name)} />
                            </Row>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
                                Добавить бронь
                            </Button>
                        </Form.Item>
                    </div>
                )}
            </Form.List>
            <Button htmlType='submit'>
                Сохранить
            </Button>
        </Form>
        // {/* </Drawer> */}
    );
}

export default BookingCreateModal;

