import { Col, Form, Row } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import moment from 'moment';
import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import ColorPool from '../../../common/utils/color/ColorPool';
import OrderCreation from '../../../entities/OrderCreation';
import { selectDate } from '../../date-picker/redux/slice';
import CustomDatePicker from '../../date-picker/ui/CustomDatePicker';
import BookingForm, { FormListBooking } from './BookingForm';
import { DATE_PICKER_PATH, BOOKING_LIST_PATH, Booking, ROOM_PATH } from './OrderCreateForm';

interface BookingGroupProps {
    globalForm: FormInstance,
    bookings: Booking[],
    orderId: number
}

const BookingGroup: React.FC<BookingGroupProps> = ({ globalForm, orderId, bookings }) => {
    const dispatch = useAppDispatch();
    const selectedDate = useAppSelector(state => state.datePickerReducer.currentDate);
    const color = ColorPool.instance.getColor(orderId);

    const onChangeDate = (date: moment.Moment | null, dateStr: string) => dispatch(selectDate(date ?? moment()));
    useEffect(() => {
        globalForm.setFieldValue(DATE_PICKER_PATH, selectedDate);
    }, [selectedDate])

    return (
        <>
            <Row>
                <Col span={12}>
                    <Form.Item name={DATE_PICKER_PATH}>
                        <CustomDatePicker
                            style={{ width: '100%' }}
                            value={selectedDate}
                            onChange={onChangeDate} />
                    </Form.Item>
                </Col>
            </Row>
            <div className="bookings-wrapper">
                <Form.List name={BOOKING_LIST_PATH}>
                    {(fields, { add, remove }) => (
                        <Row gutter={[20, 0]} wrap={false}>
                            {fields.map((field, index) => {
                                return (<Col>
                                    <BookingForm
                                        key={index}
                                        field = {field}
                                        booking={bookings[index]}
                                        orderId={orderId}
                                        color={color} />
                                </Col>)
                            })
                            }
                        </Row>
                    )
                    }
                </Form.List>

            </div>
        </>
    );
}

export default BookingGroup;