import { Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { ruLocale } from '../ruLocale';

interface DatePickerProps {
    oldPanel: React.ReactNode,
    setDate: (date: moment.Moment | null, dateStr: string) => void,
    currentDate?: moment.Moment | null
}

const DatePickerPanel: React.FC<DatePickerProps> = ({ oldPanel, setDate, currentDate }) => {

    const calendarFormat: moment.CalendarSpec = {
        sameDay: '[Сегодня]',
        nextDay: '[Завтра]',
        nextWeek: '[Послезавтра]',
        lastDay: '[Вчера]',
        lastWeek: '[Позавчера]',
        sameElse: 'DD/MM/YYYY'
    }

    const buildDateNavProps = (date: moment.Moment): React.HTMLAttributes<HTMLDivElement> => {
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
        .map((item, index) => <div key={index} {...buildDateNavProps(item)}>{item.calendar(calendarFormat)}</div>)

    return (
        <Row>
            <Col className='nav-column' span={6} >
                {buildNavDates()}
            </Col>
            <Col span={16}>
                {oldPanel}
            </Col>
        </Row>
    )
}

export default DatePickerPanel;