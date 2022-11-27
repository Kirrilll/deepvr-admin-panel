import TimeHelper, { Time } from "../common/helpers/TimeHelper";

export const enum EPaymentStatus {
    PAID = 'Оплачено',
    NOTPAID = 'Не оплачено'
}

export const enum EConfirmStatus {
    CONFIRM = 'Подтверждено',
    NOTCONFIRM = 'Не подтверждено',
    CANCELED = 'Отменено'
}


interface OrderView {
    id: number,
    date: moment.Moment,
    clientName: string,
    comment?: string,
    paymentStatus: EPaymentStatus,
    phone: string,
    color: string,
    bookings: BookingView[]
}

export interface BookingView {
    id: number
    confirmStatus: EConfirmStatus,
    gameTitle: string,
    guestCount: number,
    startTime: Time,
    durationMin: number,
    roomId: number,
    gameId: number,
    comment?: string,
}

export default OrderView;
