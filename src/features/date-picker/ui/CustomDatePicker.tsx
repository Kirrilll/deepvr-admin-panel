import { DatePicker } from 'antd';
import React from 'react';
import { ruLocale } from '../../../common/configs/ruLocale';
import DateNavPanel from './DateNavPanel';
import DateCell from './DateCell';
import CalendarIcon from '../../../assets/calendarIcon.svg';
import moment from 'moment';


type DatePickerProps = typeof DatePicker.prototype

const CustomDatePicker: React.FC<DatePickerProps> = (props) => {

    const buildDateCell = (currentDate: moment.Moment, today: moment.Moment) => <DateCell
        isActive={currentDate.isSame(props.value, 'date')}
        date={currentDate} />

    const buildDateNavPanel = (mode: any) => <DateNavPanel
        setDate={props.onChange ?? function _() { return; }}
        currentDate={props.value}
    />

    return (
        <DatePicker
            {...props}
            allowClear={false}
            showToday={false}
            suffixIcon={<img src={CalendarIcon} />}
            className='date-picker-input'
            locale={ruLocale}
            renderExtraFooter={buildDateNavPanel}
            format="DD.MM.YYYY"
            superNextIcon={null}
            superPrevIcon={null}
            dateRender={buildDateCell}
        />
    )
}

export default CustomDatePicker;