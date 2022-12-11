import { CellPivot } from "../../../entities/Cell";
import { OrderView } from "../../../entities/Order";
import { Room } from "../../../entities/Room";
import { TimelineOptions } from "../../../entities/TimelineOptions";
import { TimelineType } from "../../../entities/TimelineTypes";
import { WorkingShiftView } from "../../../entities/WorkingShift";
import { TimelineStateType } from "../../../features/timeline/redux/slice";

interface Timeline {
    headersValues: any[],

}

type OrderMapDefault = Map<number, Map<string, CellPivot | null>>;
type OrderMapTransposed = Map<string, Map<number, CellPivot | null>>;


interface TimelineFactoryArgs {
    orders: OrderView[],
    type: TimelineStateType,
    options: TimelineOptions,
    rooms: Room[],
    workingParams: WorkingShiftView
}

export default class TimelineFactory {


    static createTimeline(args: TimelineFactoryArgs) {
        const { options, orders, type, rooms, workingParams } = args;

        switch (type) {
            case 'default':
                return TimelineFactory.createDefault(orders, workingParams.time, rooms);
            case 'transposed':
                return TimelineFactory.createTransposed(orders, workingParams.time, rooms);
            default:
                throw Error('Imposible timeline view');
        }
    }


    private static createTransposed(orders: OrderView[], times: string[], rooms: Room[]) {
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
        return map;
    }

    private static createDefault(orders: OrderView[], times: string[], rooms: Room[]) {
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

        return map;
    }
}