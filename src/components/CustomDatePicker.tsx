import { DatePicker, DatePickerProps } from 'antd';
import React from 'react';
import { ruLocale } from '../ruLocale';
import DatePickerPanel from './DatePickerPanel';
import DateCell from './DateCell';
import CalendarIcon from '../assets/calendarIcon.svg';

const CustomDatePicker: React.FC<DatePickerProps> = (props) => {

    const buildDateCell = (currentDate: moment.Moment, today: moment.Moment) => <DateCell
        isToday={currentDate.isSame(today)}
        date={currentDate} />

    const buildDatePanel = (oldPanel: React.ReactNode) => <DatePickerPanel
        oldPanel={oldPanel}
        setDate={props.onChange ?? function _() { return; }}
        currentDate={props.value}
    />

    return (
        <DatePicker
            {...props}
            allowClear={false}
            suffixIcon={<img src={CalendarIcon} />}
            className='date-picker-input'
            popupClassName="date-panel-popup"
            locale={ruLocale}
            format="DD.MM.YYYY"
            superNextIcon={null}
            superPrevIcon={null}
            panelRender={buildDatePanel}
            dateRender={buildDateCell}
        />
    )
}

export default CustomDatePicker;