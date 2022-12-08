import { LabeledValue } from "antd/lib/select";
import { type } from "os";

export interface Room {
    id: number;
    title: string;
    guest_max: number;
}

type RoomResponse = Room[];
export type RoomValue = LabeledValue | {room: Room};

export default RoomResponse;