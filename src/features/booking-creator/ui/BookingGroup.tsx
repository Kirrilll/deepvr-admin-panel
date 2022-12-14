import { useDrag, useGesture } from '@use-gesture/react';
import { Col, Form, FormListFieldData, Row } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import moment from 'moment';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import BookingHelper from '../../../common/helpers/BookingHelper';
import ColorPool from '../../../common/utils/color/ColorPool';
import { selectDate } from '../../date-picker/redux/slice';
import CustomDatePicker from '../../date-picker/ui/CustomDatePicker';
import { selectCells } from '../../selection/redux/selectors';
import { availableGlassesSelector } from '../../timeline/redux/selectors';
import { CellIndeficator } from '../../timeline/redux/slice';
import BookingForm from './BookingForm';
import { DATE_PICKER_PATH, BOOKING_LIST_PATH, FormBooking, TIME_PATH, GUEST_COUNT_PATH } from './OrderCreateForm';

interface BookingGroupProps {
    globalForm: FormInstance,
    date: moment.Moment,
    orderId: number
}

const DRAGGING_SENSITY = 0.1;

const BookingGroup: React.FC<BookingGroupProps> = ({ globalForm, orderId, date }) => {
    const dispatch = useAppDispatch();
    const selectedDate = useAppSelector(state => state.datePickerReducer.currentDate);
    const availableGlasses = useAppSelector(availableGlassesSelector);
    const color = ColorPool.instance.getColor(orderId);

    const onChangeDate = (date: moment.Moment | null, dateStr: string) => dispatch(selectDate(date ?? moment()));
    useEffect(() => {
        globalForm.setFieldValue(DATE_PICKER_PATH, selectedDate);
    }, [selectedDate])

    const bookingsContainerRef = useRef<HTMLDivElement>(null);

    const bind = useGesture({
        onDrag: ({ delta }) => {
            bookingsContainerRef.current?.scrollBy(-delta[0], 0);
            document.body.style.cursor = 'grabbing';
            document.body.style.userSelect = 'none';
        },
        onDragEnd: () => {
            document.body.style.cursor = 'grab';
            document.body.style.userSelect = 'auto';
        },
        onHover: ({ hovering }) => {
            const docStyle = document.body.style;
            if (hovering) {
                document.body.style.cursor = 'grab';
            }
            else {
                document.body.style.cursor = 'default';
            }
        },


    })

    const buildGuestMax = (booking: FormBooking) => {
        const bookings = globalForm.getFieldValue(BOOKING_LIST_PATH) as FormBooking[];
        const availableGlassesAtTime = availableGlasses.get(booking[TIME_PATH]) ?? 0;
        if (bookings === undefined) {
            return availableGlassesAtTime
        }
        if (bookings.length == 0) {
            return availableGlassesAtTime
        }
        const bookingsGlassesUsage = bookings
            .filter(b => !BookingHelper.isSame(b, booking) || b[TIME_PATH] == booking[TIME_PATH])
            .map(booking => booking[GUEST_COUNT_PATH] ?? 0)
            .reduce((prev, next) => +prev + +next);

        return availableGlassesAtTime - bookingsGlassesUsage;
    }


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
                <Form.List
                    name={BOOKING_LIST_PATH}
                >
                    {(fields, { add, remove, move }) => (
                        <Row gutter={[20, 0]} wrap={false}>
                            {fields.map((field, index) => {
                                return (<Col>
                                    <BookingForm
                                        key={index}
                                        date={date}
                                        calcGuestMax={() => buildGuestMax(globalForm.getFieldValue(BOOKING_LIST_PATH)[index])}
                                        booking={globalForm.getFieldValue(BOOKING_LIST_PATH)[index]}
                                        fields={fields}
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
