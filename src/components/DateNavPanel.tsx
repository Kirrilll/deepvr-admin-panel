import { Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { ruLocale } from '../ruLocale';

interface DatePickerProps {
    setDate: (date: moment.Moment | null, dateStr: string) => void,
    currentDate?: moment.Moment | null
}

const DateNavPanel: React.FC<DatePickerProps> = ({ setDate, currentDate }) => {

    const calendarFormat: moment.CalendarSpec = {
        sameDay: '[Сегодня]',
        nextDay: '[Завтра]',
        nextWeek: '[Послезавтра]',
        lastDay: '[Вчера]',
        lastWeek: '[Позавчера]',
        sameElse: 'DD/MM/YYYY'
    }


    const buildDateNavProps = (date: moment.Moment): React.HTMLAttributes<HTMLAnchorElement> => {
        let className = 'nav-date';
        if (date.isSame(currentDate, 'dates')) {
            className += ' active';
        }
        return {
            onClick: () => setDate(date, date.toString()),
            className: className
        }
    }

    const buildNavDates = () => [0, 0, 0, 0, 0]
        .map((value, index, arr) => moment().add(index - Math.floor(arr.length / 2), 'days'))
        .map((item, index) => <a key={index} onClick={(e) => {
            e.preventDefault();
            console.log('adadad');
        }} {...buildDateNavProps(item)}>{item.calendar(calendarFormat)}</a>
        )

    return (
        <Col className='nav-column' span={8} >
            {buildNavDates()}
        </Col>
    )
}

export default DateNavPanel;