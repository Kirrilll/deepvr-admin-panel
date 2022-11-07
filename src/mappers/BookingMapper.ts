import ColorPool from "../ColorPool";
import { OrderView } from "../components/BookingCreateModal";
import BookingResponse, { Booking } from "../entities/Booking";
import BookingView, { EConfirmStatus, EPaymentStatus } from "../entities/BookingView";
import { Order } from "../entities/Order";


//Большая сущность - плиточка,
//Номер заказа это id Order
//Время указано в большой сущности


//BookingInfo - сущночть плиточки(заказ), имеет цвет(он конструируется относительно id брони)
//В ЗАКАЗЕ есть id комнаты
//в заказе есьь id ЗАКАЗА, это key для JSX


//TODO вынести всю работу со временем в TimeHelper
export default class BookingMapper {


    private static timeToString(timeValue: number): string {
        return timeValue > 10 ? timeValue.toString() : `0${timeValue}`;
    }

    private static fromEntity(booking: Booking): BookingView {

        const colorPool = ColorPool.instance;
        const bookingDate = new Date(booking.booking_date);


        const endDate = new Date(bookingDate);
        //Складывать потом booking.time_duration к minutes
        endDate.setHours(bookingDate.getHours() + 1);

        const startTime = `${this.timeToString(bookingDate.getHours())}:${this.timeToString(bookingDate.getMinutes())}`;
        const endTime = `${this.timeToString(endDate.getHours())}:${this.timeToString(endDate.getMinutes())}`;

        return ({
            id: booking.orders[0].id,
            room_id: booking.room_id,
            color: colorPool.getColor(booking.orders[0].id),
            comment: booking.comment_user,
            timeStart: startTime,
            timeEnd: endTime,
            paymentStatus: EPaymentStatus.NOTPAID,
            confirmStatus: EConfirmStatus.CANCELED,
            title: booking.game.title,
            phone: `8${booking.user_phone}`,
            guestCount: booking.guest_quantity,
            date: new Date(booking.booking_date)
        })
    }


    static mapData(bookings: BookingResponse): Map<number, Map<string, BookingView>> {
        //ключ 1 - id комнаты,
        //ключ 2 - время
        const roomMap = new Map<number, Map<string, BookingView>>();
        for (const booking of bookings) {
            const id = booking.room_id;
            const shedule = roomMap.get(id) ?? new Map<string, BookingView>();
            shedule.set(
                `${new Date(booking.booking_date).getHours()}:00`,
                this.fromEntity(booking)
            );
            roomMap.set(id, shedule);
        }

        return roomMap;
    }

    static mapDataTranspose(bookings: BookingResponse): Map<string, Map<number, BookingView>> {

        const timeMap = new Map<string, Map<number, BookingView>>();
        for (const booking of bookings) {
            const timeKey = `${new Date(booking.booking_date).getHours()}:00`;
            const shedule = timeMap.get(timeKey) ?? new Map<number, BookingView>();
            shedule.set(
                booking.room_id,
                this.fromEntity(booking)
            )
            timeMap.set(timeKey, shedule);
        }
        return timeMap;
    }

    static getBookedTimeByRoom(bookings: BookingResponse, roomId: number | null) {
        console.log(roomId);
        console.log(bookings);
        return Array.from(new Set(bookings
            .filter(booking => booking.room_id === roomId)
            .map(booking => BookingMapper.fromEntity(booking))
            .map(booking => booking.timeStart)).values());
    }

    static toOrder(order: OrderView, token: string ): Order {
        const cutRegEx: RegExp = /^8|(\+7)/;
        const cuttedPhone = order.phone.trim().replace(cutRegEx, '');
        return ({
            token: token,
            status: order.confirmStatus.toString(),
            phone: cuttedPhone,
            name: order.name,
            date: order.date.format('YYYY-MM-DD'),
            comment: null,
            promo_code: null,
            bonus: '0',
            bookings: order.bookings.map(booking => ({
                time: booking.time,
                game_id: booking.gameId,
                room_id: booking.roomId,
                guest_quantity: booking.guest_quantity
            })) 
        })
    }
}