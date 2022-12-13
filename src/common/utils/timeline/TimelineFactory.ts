import { CellPivot } from "../../../entities/Cell";
import { OrderView } from "../../../entities/Order";
import { Room } from "../../../entities/Room";
import { TimelineOptions } from "../../../entities/TimelineOptions";
import { DefaultTimeline, Timeline, TimelineType, TransposedTimeline } from "../../../entities/TimelineTypes";
import { WorkingShiftView } from "../../../entities/WorkingShift";
import { TimelineStateType } from "../../../features/timeline/redux/slice";
import TimelineMapper from "../../mappers/TimelineMapper";


export type OrderMapDefault = Map<number, Map<string, CellPivot | null>>;
export type OrderMapTransposed = Map<string, Map<number, CellPivot | null>>;


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
                return TimelineFactory.createDefault(orders, workingParams.time, rooms, workingParams.glasses);
            case 'transposed':
                return TimelineFactory.createTransposed(orders, workingParams.time, rooms, workingParams.glasses);
            default:
                throw Error('Imposible timeline view');
        }
    }

    private static createTransposed(orders: OrderView[], times: string[], rooms: Room[], initialGlasses: number): TransposedTimeline {

        const glassesMap = new Map<string, number>(times.map(time => [time, initialGlasses]));
        const defaultRoomMap: Map<number, CellPivot | null> = new Map(rooms.map(room => [room.id, null]));
        const ordersMap: OrderMapTransposed = new Map(times.map(time => [
            time,
            new Map(defaultRoomMap)
        ]));

        for (const order of orders) {
            for (let bookingIndex = 0; bookingIndex < order.bookings.length; bookingIndex++) {
                const booking = order.bookings[bookingIndex];
                const time = booking.startTime.time;
                const roomId = booking.roomId;
                glassesMap.set(time, (glassesMap.get(time) ?? initialGlasses) - booking.guestCount);
                const shedule = ordersMap.get(time) ?? new Map(defaultRoomMap);
                shedule.set(roomId, { order: order, bookingIndex: bookingIndex })
            }
        }

        return ({
            header: rooms,
            presentCol: times,
            matrix: TimelineMapper.toOrderMatrixTransposed(ordersMap),
            remainingGlassesMap: glassesMap
        });
    }

    private static createDefault(orders: OrderView[], times: string[], rooms: Room[], initialGlasses: number): DefaultTimeline {
        const glassesMap = new Map<string, number>(times.map(time => [time, initialGlasses]));
        const defaultSheduleMap = new Map(times.map(time => ([time, null])));
        const ordersMap: OrderMapDefault = new Map(
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
                glassesMap.set(time, (glassesMap.get(time) ?? initialGlasses) - booking.guestCount)
                const shedule = ordersMap.get(roomId) ?? new Map(defaultSheduleMap);
                shedule.set(time, { order: order, bookingIndex: bookingIndex })
                //ordersMap.set(roomId, shedule);
            }
        }
        return ({
            header: times,
            presentCol: rooms,
            matrix: TimelineMapper.toOrderMatrixDefault(ordersMap),
            remainingGlassesMap: glassesMap
        })

    }
}
