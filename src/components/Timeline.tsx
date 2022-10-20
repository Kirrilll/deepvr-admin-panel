import { Table } from "antd";
import { ColumnGroupType, ColumnsType, ColumnType } from "antd/es/table";
import { type } from "os";
import React from "react";
import { BookingInfo, EConfirmStatus, EPaymentStatus } from "../types";
import Cell from "./Cell";


interface RoomData {
    name: string,
    shedule: Record<string, BookingInfo | null>
}




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
    }

    const columns: ColumnsType<RoomData> = [
        {
            title: 'Залы',
            key: 'rooms',
            dataIndex: 'rooms',
            render: (title, data) => <div>{data.name}</div>
        },
        ...Object.keys(shedule).map<ColumnType<RoomData>>(key => ({
            title: key,
            key: key,
            dataIndex: key,
            render: (value, data) => <Cell info={data.shedule[key]}/>
        }))
    ]

    const data: RoomData[] = [
        {
            name: 'Арена 1',
            shedule: shedule
        }
    ]



    return (
        <Table pagination ={false} bordered columns={columns} dataSource={data} />
    )
}

export default Timeline;