import { BookingView } from "../../entities/Booking";
import { Room, RoomValue } from "../../entities/Room";

export default class RoomMapper {
    static gameToValue(room: Room): RoomValue {
        return ({
            key: room.id.toString(),
            label: room.title,
            value: room.id,
            room: room
        })
    }

    static gamesToValues(rooms: Room[]): RoomValue[] {
        return rooms.map(room => RoomMapper.gameToValue(room));
    }

    static roomsToPopoverView(rooms: Room[], bookings: BookingView[]): string {
        return bookings
            .map(booking => ({
                time: booking.startTime.time,
                room: rooms
                    .find(room => room.id === booking.roomId)?.title ?? ''
            }))
            .map(booking => `${booking.room}(${booking.time})`)
            .join(', ');
    }
}