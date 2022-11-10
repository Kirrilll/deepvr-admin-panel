import OrderView, { EPaymentStatus } from "./OrderView";

export interface BookingShort {
    time: string;
    room_id: number;
    game_id: number;
    guest_quantity: number;
}


export interface OrderViewForm {
    token: string;
    status: string;
    name: string;
    phone: string;
    bonus: string | null;
    date: string;
    bookings: BookingShort[];
    promo_code?: string | null;
    comment: string | null;
}
