import { useDrag } from '@use-gesture/react';
import { Table } from 'antd';
import React, { useEffect, useMemo, useRef } from 'react';
import { useAppSelector } from '../../../app/store';
import TimelineMapper from '../../../common/mappers/TimelineMapper';
import { OrderMapDefault, OrderMapTransposed } from '../../../common/utils/timeline/TimelineFactory';
import TimelineDirectorFactory from '../../../common/utils/timeline/TimlineFactoryDirector';
import { CellPivot } from '../../../entities/Cell';
import { OrderView } from '../../../entities/Order';
import { Room } from '../../../entities/Room';
import { TimelineMode, TimelineOptions } from '../../../entities/TimelineOptions';
import { Timeline, TimelineType } from '../../../entities/TimelineTypes';
import { timelineSelector } from '../redux/selectors';


interface TimelineProps {
    options: TimelineOptions,
    timeline: Timeline<any, any>,
    type: TimelineType
}

const REFERENCE_CELL_WIDTH = 190;

const TimelineTable: React.FC<TimelineProps> = ({ options, timeline, type }) => {


    const director = useMemo(() => TimelineDirectorFactory.createTimelineDirector(type), [type]);
    const timelineView = useMemo(() => director.construct(timeline), [timeline, type]);

    return (
        <Table
            rowKey={record => record.leadingCol.key}
            tableLayout='fixed'
            pagination={false}
            bordered
            columns={timelineView.columns}
            dataSource={timelineView.data}
            summary={timelineView.summary}
            scroll={options.isFixed
                ? {
                    x: REFERENCE_CELL_WIDTH * timelineView.columns.length,
                }
                : undefined}
        />
    )
}

export default TimelineTable;