
export interface Cart {
    title: string;
    quantity: number;
    amount: number;
}

export interface PaymentInfo {
    order_id: number;
    is_payed: boolean;
    accepted?: any;
    instance?: any;
    client_id: number;
    transactions: any[];
    promo?: any;
    bonus: number;
    amount: number;
    amount_without_discount: number;
    payed_real: number;
    need_to_pay: number;
    cart: Cart[];
}

export interface Pivot {
    order_id: number;
    booking_id: number;
}

export interface Game {
    id: number;
    title: string;
}

export interface Booking {
    id: number;
    booking_date: Date;
    game_id: number;
    room_id: number;
    guest_quantity: number;
    price: number;
    comment?: any;
    status: string;
    deleted_at?: any;
    created_at: Date;
    updated_at: Date;
    comment_user?: any;
    user_id?: any;
    user_name?: any;
    user_phone: string;
    time_duration: number;
    room_blocked: number;
    external_id?: any;
    client_id: number;
    pivot: Pivot;
    game: Game;
}

export interface Client {
    id: number;
    role_id: number;
    name: string;
    email?: any;
    avatar: string;
    email_verified_at?: any;
    temp_password?: any;
    settings: any[];
    created_at: Date;
    updated_at: Date;
    phone: string;
    category_loyalty_id?: any;
}

export interface Order {
    id: number;
    client_id: number;
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
    transactions: any[];
}

export type OrderResponse = Order[];