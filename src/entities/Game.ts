import { Room } from "./Room";

export interface Pivot {
    game_id: number;
    room_id: number;
}

type  RoomExpanded = Room & {pivot: Pivot};

export interface GameType {
    id: number;
    title: string;
    need_all_room: number;
    time_duration: number;
    guest_min: number;
    guest_max: number;
    slug: string;
    image: string;
}

export interface Game {
    id: number;
    title: string;
    slug: string;
    time_duration: number;
    price: number;
    game_type_id: number;
    is_active: number;
    deleted_at?: any;
    created_at: Date;
    updated_at: Date;
    logo?: any;
    guest_min?: number;
    guest_max?: number;
    description?: any;
    age_limit?: any;
    images?: any;
    video?: any;
    descriptio?: any;
    genre?: any;
    rooms: RoomExpanded[];
    game_type: GameType;
}

export type GameResponse = Game[];
