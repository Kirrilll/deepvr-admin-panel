import { Col, Grid, Row, Table } from "antd";
import { TableProps } from "antd/lib/table";
import { ColumnsType } from "rc-table/lib/interface";
import React from "react";
import { BookingInfo, EConfirmStatus, EPaymentStatus } from "../types";
import BookedCell from "./BookedCell";


const Timeline: React.FC = () => {


    const confirmedCell: BookingInfo = {
        id: 423,
        title: 'Vader',
        time: '11:00 - 12:00',
        confirmStatus: EConfirmStatus.CONFIRM,
        paymentStatus: EPaymentStatus.NOTPAID,
        phone: '',
        guestCount: 2,
        rooms: []
    }

    const notConfirmedCell: BookingInfo = {
        id: 23,
        title: 'Vader',
        time: '11:00 - 12:00',
        confirmStatus: EConfirmStatus.NOTCONFIRM,
        paymentStatus: EPaymentStatus.NOTPAID,
        phone: '',
        guestCount: 2,
        rooms: []
    }

    const canceledCell: BookingInfo = {
        id: 124,
        title: 'Vader',
        time: '11:00 - 12:00',
        confirmStatus: EConfirmStatus.CANCELED,
        paymentStatus: EPaymentStatus.NOTPAID,
        phone: '',
        guestCount: 2,
        rooms: []
    }


    return (
        <>
            <Row style={{height: '100px'}} gutter={[12, 12]}>
                <Col span={8}>
                    <BookedCell color="#B4E14E" bookingInfo={confirmedCell} />
                </Col>
                <Col span={8}>
                    <BookedCell color="#F091AA" bookingInfo={notConfirmedCell} />
                </Col>
                <Col span={8}>
                    <BookedCell color="#952EF1" bookingInfo={canceledCell} />
                </Col>
            </Row>
            <Row gutter={[12, 12]}>
                <Col span={8}>
                    <BookedCell color="#B4E14E" bookingInfo={confirmedCell} />
                </Col>
                <Col span={8}>
                    <BookedCell color="#F091AA" bookingInfo={notConfirmedCell} />
                </Col>
                <Col span={8}>
                    <BookedCell color="#952EF1" bookingInfo={canceledCell} />
                </Col>
            </Row>
        </>
    )
}

export default Timeline;