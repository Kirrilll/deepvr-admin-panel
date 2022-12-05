import { Time } from "../common/helpers/TimeHelper";
import { GameOrder } from "./Game";
import { Pivot } from "./Order";
import { EConfirmStatus } from "./PaymentInfo";

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
    game: GameOrder;
}

export interface BookingView {
    id: number
    confirmStatus: EConfirmStatus,
    gameTitle: string,
    guestCount: number,
    startTime: Time,
    durationMin: number,
    price: number,
    roomId: number,
    gameId: number,
    comment?: string,
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

export interface BookingDto {
    id: string | null; 
    time: string;
    room_id: number;
    game_id: number;
    guest_quantity: number;
}