export interface Room {
    id: number;
    title: string;
    guest_max: number;
}

type RoomResponse = Room[];

export default RoomResponse;