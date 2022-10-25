import { DatePicker } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import CustomDatePicker from './CustomDatePicker';

interface DateRangeState {
    date: moment.Moment | null,
    isOpen: boolean
}

const initialState: DateRangeState = {
    date: moment(),
    isOpen: false
}

const DateRange: React.FC = () => {
    const [state, setState] = useState<DateRangeState>(initialState)

    const onStartChange = (date: moment.Moment | null, dateStr: string) => {
        setState({
            isOpen: false,
            date: date
        });
    };

    const handleStartOpenChange = (isOpen: boolean) => {
        setState({ ...state, isOpen: isOpen });
    };

    return (
        <div>
            <CustomDatePicker
                //disabledDate={disabledStartDate}
                value={state.date}
                open={state.isOpen}
                onChange={onStartChange}
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