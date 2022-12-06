
import { CellPivot } from "../../entities/Cell";
import { OrderView } from "../../entities/Order";
import { Room } from "../../entities/Room";
import { OrderCellMatrix } from "../../entities/TimelineTypes";


type OrderMapDefault = Map<number, Map<string, CellPivot | null>>;
type OrderMapTransposed = Map<string, Map<number, CellPivot | null>>;

export default class TimelineMapper {

    private static mapToMatrix<KeyOneType, KeyTwoType, ValueType>(map: Map<KeyOneType, Map<KeyTwoType, ValueType>>): ValueType[][] {
        return Array
            .from(map.values())
            .map(innerMap => Array
                .from(innerMap.values()))
    }

    static toOrderMatrixDefault(orders: OrderView[], times: string[], rooms: Room[]): OrderCellMatrix {
        const defaultSheduleMap = new Map(times.map(time => ([time, null])));
        const map: OrderMapDefault = new Map(
            rooms.map(room => ([
                room.id,
                new Map(defaultSheduleMap)
            ]))
        );
        for (const order of orders) {
            for (let bookingIndex = 0; bookingIndex < order.bookings.length; bookingIndex++) {
                const booking = order.bookings[bookingIndex];
                const roomId = booking.roomId;
                const time = booking.startTime.time;
                const shedule = map.get(roomId) ?? new Map(defaultSheduleMap);
                shedule.set(time, {
                    order: order,
                    bookingIndex: bookingIndex
                })
                map.set(
                    roomId,
                    shedule
                );
            }
        }
        return TimelineMapper.mapToMatrix<number, string, CellPivot | null>(map);
    }

    static toOrderMatrixTransposed(orders: OrderView[], times: string[], rooms: Room[]): OrderCellMatrix {
        const defaultRoomMap: Map<number, CellPivot | null> = new Map(rooms.map(room => [room.id, null]));
        const map: OrderMapTransposed = new Map(times.map(time => [
            time,
            new Map(defaultRoomMap)
        ]));

        for (const order of orders) {
            for (let bookingIndex = 0; bookingIndex < order.bookings.length; bookingIndex++) {
                const booking = order.bookings[bookingIndex];
                const time = booking.startTime.time;
                const roomId = booking.roomId;
                const shedule = map.get(time) ?? new Map(defaultRoomMap);
                shedule.set(roomId, { order: order, bookingIndex: bookingIndex })
            }
        }
        return TimelineMapper.mapToMatrix<string, number, CellPivot | null>(map);
    }
}