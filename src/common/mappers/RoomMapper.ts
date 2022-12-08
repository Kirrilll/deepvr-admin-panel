import { Room, RoomValue } from "../../entities/Room";

export default class RoomMapper {
    static gameToValue(room: Room): RoomValue{
        return ({
            key: room.id.toString(),
            label: room.title,
            value: room.id,
            room: room
        })
    }

    static gamesToValues(rooms: Room[]): RoomValue[]{
        return rooms.map(room => RoomMapper.gameToValue(room));
    }
}