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

type TimelineTransposedProps = TimelineProps & {shedule: Map<string, Map<number, BookingView>>};

const REFERENCE_CELL_WIDTH = 190;

const TimelineTrasposed: React.FC<TimelineTransposedProps> = ({ rooms, workingShift, isLoading, shedule, isFixed}) => {

    const columns: ColumnsType<RowData> = [
        {
            title: 'Время',
            key: 'time',
            dataIndex: 'time',
            width: '10%',
            fixed: 'left',
            render: (title, data) => <div className="room-name">
                {data.time}
            </div>
        },
        ...rooms.map<ColumnType<RowData>>(room => ({
            title: room.title,
            key: room.id,
            dataIndex: room.id,
            render: (value, data) => <Cell info={data.shedule.get(room.id) ?? null} />
        }))
    ]




    const data: RowData[] = workingShift.map<RowData>(time => ({
        time: time,
        shedule: shedule.get(time) ?? new Map()
    }));



    const buildSummary = (data: readonly RowData[]): React.ReactNode => {
        const columns = new Map<number, Array<BookingView | null>>();

        for (const room of rooms) {
            columns.set(room.id, []);
        }
        for (const row of data) {
            const rowShedule = row.shedule;
            for (const roomId of Array.from(rowShedule.keys())) {
                columns.set(roomId, [...columns.get(roomId) ?? [], rowShedule.get(roomId) ?? null])
            }
        }
        return <TableSummary columns={Array.from(columns.values())} />
    };


    return (
        <Table
            loading={isLoading}
            rowKey={record => record.time}
            tableLayout='fixed'
            pagination={false}
            bordered
            columns={columns}
            dataSource={data}
            summary={buildSummary}
            scroll={isFixed ? { x: REFERENCE_CELL_WIDTH * workingShift.length } : undefined}
        />
    )
}

export default TimelineTrasposed;