import { Col, Form, Row } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import moment from 'moment';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import ColorPool from '../../../common/utils/color/ColorPool';
import OrderCreation from '../../../entities/OrderCreation';
import { selectDate } from '../../date-picker/redux/slice';
import CustomDatePicker from '../../date-picker/ui/CustomDatePicker';
import BookingForm from './BookingForm';
import { DATE_PICKER_PATH, BOOKING_LIST_PATH } from './OrderCreateForm';

interface BookingGroupProps {
    globalForm: FormInstance,
    order: OrderCreation | null
}

const BookingGroup: React.FC<BookingGroupProps> = ({ globalForm, order }) => {
    const dispatch = useAppDispatch();
    const selectedDate = useAppSelector(state => state.datePickerReducer.currentDate);
    const color = order?.color ?? ColorPool.instance.getColor(-1);

    const onChangeDate = (date: moment.Moment | null, dateStr: string) => dispatch(selectDate(date ?? selectedDate));
    

    return (
        <>
            <Row>
                <Col span={12}>
                    <Form.Item name={DATE_PICKER_PATH} initialValue = {selectedDate}>
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
                            {fields.map((field, index) =>
                                <Col>
                                    <BookingForm
                                        key={field.key}
                                        booking={field}
                                        color={color} />
                                </Col>)
                            }
                        </Row>
                    )}
                </Form.List>
            </div>
        </>
    );
}

export default BookingGroup;