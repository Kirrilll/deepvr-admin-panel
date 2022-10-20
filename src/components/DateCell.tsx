import React, { useMemo } from 'react'

interface DateCellProps{
    date: moment.Moment,
    isToday: boolean
}

const DateCell: React.FC<DateCellProps> = ({date, isToday}) => {
    
    const className = isToday ? 'date-cell active': 'date-cell';

    return (
        <div className={className}>
            {date.date()}
        </div>
    )
}

export default DateCell;