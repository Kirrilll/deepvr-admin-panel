import { useDrag } from '@use-gesture/react';
import { Table } from 'antd';
import React, { useEffect, useMemo, useRef } from 'react';
import { useAppSelector } from '../../../app/store';
import TimelineMapper from '../../../common/mappers/TimelineMapper';
import { OrderMapDefault, OrderMapTransposed } from '../../../common/utils/timeline/TimelineFactory';
import TimelineDirectorFactory from '../../../common/utils/timeline/TimlineFactory';
import { CellPivot } from '../../../entities/Cell';
import { OrderView } from '../../../entities/Order';
import { Room } from '../../../entities/Room';
import { TimelineMode, TimelineOptions } from '../../../entities/TimelineOptions';
import { TimelineType } from '../../../entities/TimelineTypes';
import { selectTimelineMap } from '../redux/selectors';


interface TimelineProps {
    options: TimelineOptions,
    glasses: number,
    data: OrderMapDefault | OrderMapTransposed,
    workingShift: string[],
    rooms: Room[],
    type: TimelineType
}

const REFERENCE_CELL_WIDTH = 190;

const Timeline: React.FC<TimelineProps> = ({ options, data, workingShift, rooms, glasses, type }) => {


    const director = useMemo(() => TimelineDirectorFactory.createTimelineDirector(type), [type]);
    const timeline = useMemo(() => director.construct(
        workingShift,
        rooms,
        TimelineMapper.mapToMatrix<any, any, CellPivot | null>(data),
        glasses), [data, type]);

    return (
        <Table
            rowKey={record => record.leadingCol.key}
            tableLayout='fixed'
            pagination={false}
            bordered
            columns={timeline.columns}
            dataSource={timeline.data}
            summary={timeline.summary}
            scroll={options.isFixed
                ? {
                    x: REFERENCE_CELL_WIDTH * workingShift.length,
                }
                : undefined}
        />
    )
}

export default Timeline;