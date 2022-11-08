import { Table } from 'antd';
import React, { useMemo } from 'react';
import TimelineFactory from '../../../common/utils/TimlineFactory';
import BookingView from '../../../entities/BookingView';
import RoomResponse, { Room } from '../../../entities/Room';
import { TimelineMode } from '../../../entities/TimelineOptions';
import { TimelineType } from '../../../entities/TimelineTypes';

interface TimelineOptions {
    isFixed: boolean,
}


interface TimelineProps {
    options: TimelineOptions,
    glasses: number,
    mode: TimelineMode,
    data: (BookingView | null)[][],
    workingShift: string[],
    rooms: Room[],
    type: TimelineType
}

//TODO отработать 30 минутки
//Cell должна знать свое место(время, комната)
//Cell должна знать:
//                  1. Выбрана ли она
//                  2. Есть ли возможность выбрать
//TODO Сделать кнопку создать бронь
//TODO Мультиселект на ЛКМ
//Рефактор Timeline, сделать единый тип данных(не Map), 



const REFERENCE_CELL_WIDTH = 190;

const Timeline: React.FC<TimelineProps> = ({ options, mode, data, workingShift, rooms, glasses, type }) => {

    const director = TimelineFactory.createTimeline(type);

    const timeline = director.construct(workingShift, rooms, data);


    return (
        <Table
            // loading={isLoading}
            rowKey={record => record.leadingCol.key}
            tableLayout='fixed'
            pagination={false}
            bordered
            columns={timeline.columns}
            dataSource={timeline.data}
            // summary={ }
            scroll={options.isFixed ? { x: REFERENCE_CELL_WIDTH * workingShift.length } : undefined}
        />
    )
}

export default Timeline;