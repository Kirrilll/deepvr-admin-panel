import { DatePicker } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import CustomDatePicker from './CustomDatePicker';

interface DateRangeState {
    startDate: moment.Moment | null,
    endDate: moment.Moment | null,
    isOpenEndPicker: boolean
}

const initialState: DateRangeState = {
    startDate: moment(),
    endDate: moment(),
    isOpenEndPicker: false
}

const DateRange: React.FC = () => {
    const [state, setState] = useState<DateRangeState>(initialState)

    const disabledStartDate = (startDate: moment.Moment) => {
        const { endDate } = state;
        if (!startDate || !endDate) {
            return false;
        }
        return startDate.valueOf() > endDate.valueOf();
    };

    const disabledEndDate = (endDate: moment.Moment) => {
        const { startDate } = state;
        if (!endDate || !startDate) {
            return false;
        }
        return endDate.valueOf() <= startDate.valueOf();
    };

    const _onChange = (field: keyof DateRangeState, value: moment.Moment | null) => {
        setState({
            ...state,
            [field]: value,
        });
    };

    const onStartChange = (date: moment.Moment | null, dateStr: string) => {
        _onChange('startDate', date);
    };

    const onEndChange = (date: moment.Moment | null, dateStr: string) => {
        _onChange('endDate', date);
    };

    const handleStartOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            setState({ ...state, isOpenEndPicker: true });
        }
    };

    const handleEndOpenChange = (isOpen: boolean) => {
        setState({ ...state, isOpenEndPicker: isOpen });
    };

    return (
        <div>
            <CustomDatePicker
                disabledDate={disabledStartDate}
                value={state.startDate}
                onChange={onStartChange}
                onOpenChange={handleStartOpenChange}
            />
            <CustomDatePicker
                disabledDate={disabledEndDate}
                value={state.endDate}
                open={state.isOpenEndPicker}
                onChange={onEndChange}
                onOpenChange={handleEndOpenChange}
            />
        </div>
    )
}

export default DateRange;