import { useDrag, useGesture } from '@use-gesture/react';
import { Table } from 'antd';
import React, { useEffect, useMemo, useRef } from 'react';
import { useFetcher } from 'react-router-dom';
import { AppDispatch, useAppSelector } from '../../../app/store';
import TimelineMapper from '../../../common/mappers/TimelineMapper';
import StorageService from '../../../common/services/StorageService';
import { OrderMapDefault, OrderMapTransposed } from '../../../common/utils/timeline/TimelineFactory';
import TimelineDirectorFactory from '../../../common/utils/timeline/TimlineFactoryDirector';
import { CellPivot } from '../../../entities/Cell';
import { OrderView } from '../../../entities/Order';
import { Room } from '../../../entities/Room';
import { TimelineMode, TimelineOptions } from '../../../entities/TimelineOptions';
import { Timeline, TimelineType } from '../../../entities/TimelineTypes';
import  {selectCell } from '../../selection/redux/slice';
import { timelineSelector } from '../redux/selectors';
import { handleTimelineAction } from '../redux/slice';


interface TimelineProps {
    options: TimelineOptions,
    timeline: Timeline<any, any>,
    type: TimelineType,
    dispatch: AppDispatch
}

export const REFERENCE_CELL_WIDTH = 190;

const TimelineTable: React.FC<TimelineProps> = ({ options, timeline, type, dispatch }) => {
    const director = useMemo(() => TimelineDirectorFactory.createTimelineDirector(type), [type]);
    const timelineView = useMemo(() => director.construct(timeline), [timeline, type]);

    const timelineWrapperRef = useRef<HTMLDivElement>(null);

    const bind = useGesture({
        onDrag: ({ delta, movement }) => {
            const isDragging = movement[0] != 0 && movement[1] != 0;
            if (isDragging) {
                const scrollingElement = timelineWrapperRef.current
                    ?.firstChild
                    ?.firstChild
                    ?.firstChild
                    ?.firstChild
                    ?.firstChild
                    ?.firstChild as HTMLDivElement;
                scrollingElement.scrollBy(-delta[0], -delta[1]);
                document.body.style.cursor = 'grabbing';
                document.body.style.userSelect = 'none';
            }
        },
        onDragEnd: ({tap}) => {
            if(tap)  dispatch(handleTimelineAction('tap'));
            else dispatch(handleTimelineAction('moving'));
            document.body.style.cursor = 'auto';
            document.body.style.userSelect = 'auto';
        },
    })

    return (
        <div ref={timelineWrapperRef} {...bind()}>
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
                    } : undefined
                }
            />
        </div>
    )
}

export default TimelineTable;