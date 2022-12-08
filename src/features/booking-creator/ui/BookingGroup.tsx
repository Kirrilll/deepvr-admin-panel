import { useDrag } from '@use-gesture/react';
import { Col, Form, FormListFieldData, Row } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import moment from 'moment';
import React, { useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import ColorPool from '../../../common/utils/color/ColorPool';
import { selectDate } from '../../date-picker/redux/slice';
import CustomDatePicker from '../../date-picker/ui/CustomDatePicker';
import { selectCells } from '../../selection/redux/selectors';
import { CellIndeficator } from '../../timeline/redux/slice';
import BookingForm from './BookingForm';
import { DATE_PICKER_PATH, BOOKING_LIST_PATH, FormBooking } from './OrderCreateForm';

interface BookingGroupProps {
    globalForm: FormInstance,
    date: moment.Moment,
    orderId: number
}

const DRAGGING_SENSITY = 0.1;

const BookingGroup: React.FC<BookingGroupProps> = ({ globalForm, orderId, date }) => {
    const dispatch = useAppDispatch();
    const selectedDate = useAppSelector(state => state.datePickerReducer.currentDate);
    const color = ColorPool.instance.getColor(orderId);

    const onChangeDate = (date: moment.Moment | null, dateStr: string) => dispatch(selectDate(date ?? moment()));
    useEffect(() => {
        globalForm.setFieldValue(DATE_PICKER_PATH, selectedDate);
    }, [selectedDate])

    const bookingsContainerRef = useRef<HTMLDivElement>(null);

    const bind = useDrag(({dragging, active ,movement}) => {
        bookingsContainerRef.current?.style.setProperty('cursor', 'drag');
        bookingsContainerRef.current?.scrollBy(-movement[0]* DRAGGING_SENSITY, 0);
    });

   

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
            <div {...bind()} ref={bookingsContainerRef} className="bookings-wrapper">
                <Form.List name={BOOKING_LIST_PATH}>
                    {(fields, { add, remove, move }) => (
                        <Row  gutter={[20, 0]} wrap={false}>
                            {fields.map((field, index) => {
                                return (<Col>
                                    <BookingForm
                                        key={index}
                                        date={date}
                                        booking={globalForm.getFieldValue(BOOKING_LIST_PATH)[index]}
                                        field={field}
                                        orderId={orderId}
                                        color={color} />
                                </Col>)
                            })}
                        </Row>
                    )}
                </Form.List>
            </div>
        </>
    );
}

export default BookingGroup;
