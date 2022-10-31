import { Popover, Table } from "antd";
import { ColumnGroupType, ColumnsType, ColumnType } from "antd/es/table";
import Column from "antd/lib/table/Column";
import { type } from "os";
import React from "react";
import { RoomResponse } from "../entities/RoomResponse";
import { BookingInfo, EConfirmStatus, EPaymentStatus } from "../types";
import BookingPopover from "./BookingPopover";
import Cell from "./Cell";
import TableSummary from "./TableSummary";


interface RowData {
    room: RoomResponse,
    shedule: Map<string, BookingInfo | null>
}


interface TimelineProps {
    rooms: RoomResponse[],
    workingShift: string[],
    isLoading: boolean,
    shedule: Map<number, Map<string, BookingInfo>>
}


//Контроллер и стор этого компонента сразу возвращает замапенные данные, с цветом и все таким

const REFERENCE_CELL_WIDTH = 190;

const Timeline: React.FC<TimelineProps> = ({ rooms, workingShift, isLoading, shedule }) => {


    const columns: ColumnsType<RowData> = [
        {
            title: 'Залы',
            key: 'rooms',
            dataIndex: 'rooms',
            width: '10%',
            fixed: 'left',
            render: (title, data) => <div className="room-name">
                {data.room.title}
                <p className="glasses-count">{`(≤ ${data.room.guest_max} чел.)`}</p>
            </div>
        },
        ...workingShift.map<ColumnType<RowData>>(time => ({
            title: time,
            key: time,
            dataIndex: time,
            render: (value, data) => <Cell info={data.shedule.get(time) ?? null} />
        }))
    ]

    const data: RowData[] = rooms.map<RowData>(room => ({
        room: room,
        shedule: shedule.get(room.id) ?? new Map()
    }));





    const buildSummary = (data: readonly RowData[]): React.ReactNode => {
        const columns = new Map<string, Array<BookingInfo | null>>();

        for(const date of workingShift){
            columns.set(date, []);
        }
        for (const row of data) {
            const rowShedule = row.shedule;
            for(const date of Array.from(rowShedule.keys())){
                columns.set(date, [...columns.get(date) ?? [], rowShedule.get(date) ?? null])
            }
        }
        return <TableSummary columns={Array.from(columns.values())} />
    };

    return (
        <Table
            loading={isLoading}
            rowKey='uid'
            tableLayout='fixed'
            pagination={false}
            bordered
            columns={columns}
            dataSource={data}
            summary={buildSummary}
            scroll={{ x: REFERENCE_CELL_WIDTH * workingShift.length }}
        />
    )
}

export default Timeline;