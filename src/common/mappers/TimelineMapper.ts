import OrderView, { BookingView, OrderApart, OrderMatrix } from "../../entities/OrderView"
import { Room } from "../../entities/Room";

interface CellInfo {
    rowSpan: number,
    colSpan: number,
    pivot: {
        orderId: number,
        currBooking: BookingView
    }
}

type CellMatrix = CellInfo[][];
type OrderMapDefault = Map<number, Map<string, OrderView | null>>;
type OrderMapTransposed = Map<string, Map<number, OrderView | null>>;

export default class TimelineMapper {

    private static mapToMatrix<KeyOneType, KeyTwoType, ValueType>(map: Map<KeyOneType, Map<KeyTwoType, ValueType>>): ValueType[][] {
        return Array
            .from(map.values())
            .map(innerMap => Array
                .from(innerMap.values()))
    }

    static toOrderMatrixDefault(orders: OrderView[], times: string[], rooms: Room[]): OrderMatrix {
        const defaultSheduleMap = new Map(times.map(time => ([time, null])));
        const map: OrderMapDefault = new Map(
            rooms.map(room => ([
                room.id,
                new Map(defaultSheduleMap)
            ]))
        );
        for (const order of orders) {
            for (const booking of order.bookings) {
                const roomId = booking.roomId;
                const time = booking.startTime.time;
                const shedule = map.get(roomId) ?? new Map(defaultSheduleMap);
                shedule.set(time, { ...order, bookings: [booking]})
                map.set(
                    roomId,
                    shedule
                );
            }
        }
        return TimelineMapper.mapToMatrix<number, string, OrderView | null>(map);
    }

    static toOrderMatrixTransposed(orders: OrderView[], times: string[], rooms: Room[]): OrderMatrix {
        const defaultRoomMap: Map<number, OrderView | null> = new Map(rooms.map(room => [room.id, null]));
        const map: OrderMapTransposed = new Map(times.map(time => [
            time,
            new Map(defaultRoomMap)
        ]));

        for (const order of orders) {
            for (const booking of order.bookings) {
                const time = booking.startTime.time;
                const roomId = booking.roomId;
                const shedule = map.get(time) ?? new Map(defaultRoomMap);
                shedule.set(roomId, { ...order, bookings: [booking]})
            }
        }
        return TimelineMapper.mapToMatrix<string, number, OrderView | null>(map);
    }

    static toCellMatix(orderMatrix: OrderMatrix): CellMatrix {
        const matrix: CellMatrix = [[]];
        

        return matrix;
    }
}