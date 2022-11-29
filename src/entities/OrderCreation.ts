import { Time } from "../common/helpers/TimeHelper";
import { EConfirmStatus, EPaymentStatus } from "./OrderView";

export interface PrecreateOrder {
    id: number,
    updated_at: string,
    created_at: string
}

interface OrderCreation {
    id: number,
    date: moment.Moment,
    clientName?: string,
    comment?: string,
    paymentStatus: EPaymentStatus,
    confirmStatus: EConfirmStatus,
    phone?: string,
    color?: string,
    bookings: BookingCreation[]
}

export interface BookingCreation {
    id?: number
    confirmStatus?: EConfirmStatus,
    gameTitle?: string,
    guestCount?: number,
    startTime: Time,
    durationMin?: number,
    roomId: number,
    gameId?: number,
    comment?: string,
}

export default OrderCreation;