import { useDrag } from '@use-gesture/react';
import { Table } from 'antd';
import React, { useEffect, useMemo, useRef } from 'react';
import TimelineFactory from '../../../common/utils/timeline/TimlineFactory';
import { OrderView } from '../../../entities/Order';
import { Room } from '../../../entities/Room';
import { TimelineMode, TimelineOptions } from '../../../entities/TimelineOptions';
import { TimelineType } from '../../../entities/TimelineTypes';


interface TimelineProps {
    options: TimelineOptions,
    glasses: number,
    data: OrderView[],
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

const Timeline: React.FC<TimelineProps> = ({ options, data, workingShift, rooms, glasses, type }) => {
    const director = useMemo(() => TimelineFactory.createTimeline(type), [type]);

    const timeline = useMemo(() => director.construct(workingShift, rooms, data, glasses), [data, type]);

    return (
            <Table
                rowKey={record => record.leadingCol.key}
                tableLayout='fixed'
                pagination={false}
                bordered
                columns={timeline.columns}
                dataSource={timeline.data}
                summary={timeline.summary}
                scroll={options.isFixed ? { x: REFERENCE_CELL_WIDTH * workingShift.length } : undefined}
            />
    )
}

export default Timeline;