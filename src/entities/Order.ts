import { Booking, BookingCreation, BookingDto, BookingView } from "./Booking";
import Client from "./Client";
import { EConfirmStatus, EPaymentStatus, PaymentInfo } from "./PaymentInfo";


export interface Pivot {
    order_id: number;
    booking_id: number;
}

export interface EmptyOrder {
    id: number,
    updated_at: string,
    created_at: string
}

export interface Order {
    id: number;
    client_id: number;
    status: number;
    promo_id?: any;
    booking_date: string;
    accepted: number;
    accepted_by?: any;
    accepted_at?: any;
    deleted_by?: any;
    deleted_at?: any;
    created_at: Date;
    updated_at: Date;
    final_amount: string;
    paymentInfo: PaymentInfo;
    bookings: Booking[];
    client: Client;
    promo?: any;
    comment?: string;
    transactions: any[];
}

export interface OrderView {
    id: number,
    date: moment.Moment,
    clientName: string,
    comment?: string,
    paymentStatus: EPaymentStatus,
    confirmStatus: EConfirmStatus
    phone: string,
    color: string,
    bookings: BookingView[]
}


export interface OrderCreation {
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

export interface OrderDto {
    id: number;
    token: string;
    status: string;
    name: string;
    phone: string;
    bonus: string | null;
    employee_code: string,
    date: string;
    bookings: BookingDto[];
    promo_code?: string | null;
    comment: string | null;
    certificates: {code: string}[] | null
}
export type OrderResponse = Order[];