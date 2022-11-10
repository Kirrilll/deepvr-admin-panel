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

export type OrderApart = Omit<OrderView, 'bookings'> & { booking: BookingView };
export type OrderMatrix = (OrderView | null)[][];

export default OrderView;
