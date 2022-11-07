import React, { useMemo } from 'react';
import BookingMapper from '../mappers/BookingMapper';
import BookingResponse from '../entities/Booking';
import RoomResponse from '../entities/Room';
import Timeline from './Timeline';
import TimelineTrasposed from './TimelineTransposed';


export interface TimelineProps {
    rooms: RoomResponse,
    workingShift: string[],
    isFixed: boolean,
    isLoading: boolean,
    glasses: number
}


interface TimelineBuilderProps {
    data: BookingResponse,
    isTranspose: boolean,
    timelineProps: TimelineProps
}

//TODO падает на 10.11.2022

const TimelineBuilder: React.FC<TimelineBuilderProps> = ({ data, isTranspose, timelineProps }) => {

    const sheduleDefault = useMemo(() => BookingMapper.mapData(data), [data]);
    const sheduleTransposed = useMemo(() => BookingMapper.mapDataTranspose(data), [data]);

    return (
        isTranspose
            ? <TimelineTrasposed {...timelineProps} shedule={sheduleTransposed} />
            : <Timeline {...timelineProps} shedule={sheduleDefault} />
    )
}

export default TimelineBuilder;