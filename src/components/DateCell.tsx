import React, { useMemo } from 'react'

interface DateCellProps{
    date: moment.Moment,
    isActive: boolean
}

const DateCell: React.FC<DateCellProps> = ({date, isActive}) => {
    
    const className = isActive ? 'date-cell active': 'date-cell';


    return (
        <div className={className}>
            {date.date()}
        </div>
    )
}

export default DateCell;