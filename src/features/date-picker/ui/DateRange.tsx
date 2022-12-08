import { DatePicker } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { selectDate, toggleOpen } from '../redux/slice';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import CustomDatePicker from './CustomDatePicker';


const DateRange: React.FC = () => {



    const dispatch = useAppDispatch();
    const {currentDate, isOpen} = useAppSelector(state => state.datePickerReducer);



    const onChangeDate = (date: moment.Moment | null, dateStr: string) => dispatch(selectDate(date ?? currentDate))

    const handleStartOpenChange = (isOpen: boolean) => dispatch(toggleOpen(isOpen))

    return (
        <div>
            <CustomDatePicker
                //disabledDate={disabledStartDate}
                value={currentDate}
                open={isOpen}
                onChange={onChangeDate}
                onOpenChange={handleStartOpenChange}
            />
            {/* <CustomDatePicker
                disabledDate={disabledEndDate}
                value={state.endDate}
                open={state.isOpenEndPicker}
                onChange={onEndChange}
                onOpenChange={handleEndOpenChange}
            /> */}
        </div>
    )
}

export default DateRange;