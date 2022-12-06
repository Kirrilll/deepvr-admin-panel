import { OrderView } from "../../entities/Order";

export default class TimelineHelper{
    static getBookedRoomsByTime(orders: OrderView[], time: string): number[]{
        const rooms: number[] = [];
        for(const order of orders){
            for(const booking of order.bookings){
                if(booking.startTime.time === time){
                    rooms.push(booking.id);
                }
            }
        }
        return rooms;
    }

    static getBookedTimesByRoom(orders: OrderView[], roomId: number): string[]{
        const times: string[] = [];
        for(const order of orders){
            for(const booking of order.bookings){
               if(booking.roomId === roomId){
                times.push(booking.startTime.time);
               }
            }
        }
        return times;
    }
}