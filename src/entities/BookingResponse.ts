export declare module BookingResponse {

    interface Pivot {
        booking_id: number;
        order_id: number;
    }

    interface Order {
        id: number;
        client_id?: any;
        promo_id?: any;
        accepted: number;
        accepted_by?: any;
        accepted_at?: any;
        deleted_by?: any;
        deleted_at?: any;
        created_at: Date;
        updated_at: Date;
        final_amount: string;
        pivot: Pivot;
    }

    interface Game {
        id: number;
        title: string;
    }

    interface Booking {
        id: number;
        booking_date: string;
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
        user_name: string;
        user_phone: string;
        time_duration: number;
        room_blocked: number;
        external_id?: any;
        client_id?: any;
        orders: Order[];
        client?: any;
        game: Game;
    }

}