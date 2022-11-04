import { type } from "@testing-library/user-event/dist/type";
import { Table } from "antd";
import { ColumnsType, ColumnType } from "antd/es/table";
import React from "react";
import BookingView, { EPaymentStatus } from "../entities/BookingView";
import RoomResponse, { Room } from "../entities/Room";
import Cell from "./Cell";
import TableSummary from "./TableSummary";
import { TimelineProps } from "./TimelineBuilder";


interface RowData {
    time: string,
    shedule: Map<number, BookingView | null>
}

type TimelineTransposedProps = TimelineProps & { shedule: Map<string, Map<number, BookingView>> };

const REFERENCE_CELL_WIDTH = 190;

const TimelineTrasposed: React.FC<TimelineTransposedProps> = ({ rooms, workingShift, isLoading, shedule, isFixed, glasses }) => {


    const buildGlassesCount = (row: RowData) => {
        const bookings = Array.from(row.shedule.values());
        if (bookings.length == 0) return glasses;
        return glasses - bookings
            .map(booking => booking?.guestCount ?? 0)
            .reduce((prev, next) => prev + next);
    }

    const columns: ColumnsType<RowData> = [
        {
            title: 'Время',
            key: 'time',
            dataIndex: 'time',
            width: '95px',
            fixed: 'left',
            render: (title, data) => <div className="room-name">
                {data.time}
                <p className="glasses-count">{`Св. шлемы: ${buildGlassesCount(data)}`}</p>
            </div>
        },
        ...rooms.map<ColumnType<RowData>>(room => ({
            title: room.title,
            key: room.id,
            dataIndex: room.id,
            render: (value, data) => <Cell
                roomId={room.id}
                time = {data.time}
                info={data.shedule.get(room.id) ?? null}
            />
        }))
    ]


    const data: RowData[] = workingShift.map<RowData>(time => ({
        time: time,
        shedule: shedule.get(time) ?? new Map()
    }));




    return (
        <Table
            loading={isLoading}
            rowKey={record => record.time}
            tableLayout='fixed'
            pagination={false}
            bordered
            columns={columns}
            dataSource={data}
            scroll={isFixed ? { x: REFERENCE_CELL_WIDTH * workingShift.length } : undefined}
        />
    )
}

export default TimelineTrasposed;