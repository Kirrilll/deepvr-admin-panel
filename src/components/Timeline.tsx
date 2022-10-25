import { Table } from "antd";
import { ColumnGroupType, ColumnsType, ColumnType } from "antd/es/table";
import Column from "antd/lib/table/Column";
import { type } from "os";
import React from "react";
import { BookingInfo, EConfirmStatus, EPaymentStatus } from "../types";
import Cell from "./Cell";
import TableSummary from "./TableSummary";


interface RoomData {
    name: string,
    shedule: Record<string, BookingInfo | null>
}


const REFERENCE_CELL_WIDTH = 190;

const Timeline: React.FC = () => {

    const shedule: Record<string, BookingInfo | null> = {
        '12:00': null,
        '13:00': null,
        '14:00': {
            id: 423,
            time: '14:00',
            title: 'Vader',
            guestCount: 5,
            paymentStatus: EPaymentStatus.NOTPAID,
            confirmStatus: EConfirmStatus.CONFIRM,
            phone: '',
            rooms: []
        },
        '15:00': null,
        '16:00': null,
        '17:00': null,
        '18:00': null,
        // '19:00': null,
        // '20:00': null,
        // '21:00': null,
        // '22:00': null,
        // '23:00': null,
        // '24:00': null,
        // '25:00': null,
        // '26:00': null,
    }

    const columns: ColumnsType<RoomData> = [
        {
            title: 'Залы',
            key: 'rooms',
            dataIndex: 'rooms',
            width: '10%',
            fixed: 'left',
            render: (title, data) => <div className="room-name">
                {data.name}
                <p className="glasses-count">{'(≥ 4 чел.)'}</p>
            </div>
        },
        ...Object.keys(shedule).map<ColumnType<RoomData>>(key => ({
            title: key,
            key: key,
            dataIndex: key,
            render: (value, data) => <Cell info={data.shedule[key]} />
        }))
    ]

    const data: RoomData[] = [
        {
            name: 'Арена 1',
            shedule: shedule
        },
        {
            name: 'Арена 2',
            shedule: shedule
        }
    ]


    // let length = 0;
    // for (let date in shedule) {
    //     length++;
    // }


    const buildSummary = (data: readonly RoomData[]): React.ReactNode => {

        const columns = new Map<string, Array<BookingInfo | null>>();

        for (const row of data) {
            const rowShedle = row.shedule;
            Object
                .keys(rowShedle)
                .forEach(
                    (date, index, arr) => columns.set(
                        date,
                        [...columns.get(date) ?? [], rowShedle[date]]
                    )
                );
        }

        return <TableSummary columns= {Array.from(columns.values())}/>
    };

    return (
        <Table
            rowKey='uid'
            tableLayout='fixed'
            pagination={false}
            bordered
            columns={columns}
            dataSource={data}
            summary={buildSummary}
        // scroll = {{x: REFERENCE_CELL_WIDTH * length}}
        />
    )
}

export default Timeline;