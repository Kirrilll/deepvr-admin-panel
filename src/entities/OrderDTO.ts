
export interface BookingShort {
    time: string;
    room_id: number;
    game_id: number;
    guest_quantity: number;
}

interface Certificate{
    code: string
}

export interface OrderDTO {
    token: string;
    status: string;
    name: string;
    phone: string;
    bonus: string | null;
    employee_code: string,
    date: string;
    bookings: BookingShort[];
    promo_code?: string | null;
    comment: string | null;
    certificates: Certificate[] | null
}
