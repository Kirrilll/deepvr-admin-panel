import ColorPool from "./ColorPool";
import BookingResponse, { Booking } from "./entities/Booking";
import BookingView, { EConfirmStatus, EPaymentStatus } from "./entities/BookingView";


//Большая сущность - плиточка,
//Номер заказа это id Order
//Время указано в большой сущности


//BookingInfo - сущночть плиточки(заказ), имеет цвет(он конструируется относительно id брони)
//В ЗАКАЗЕ есть id комнаты
//в заказе есьь id ЗАКАЗА, это key для JSX
export default class TimelineHelper {
    private static transformSecondsToTime(seconds: number): string {
        const hours =  Math.floor(seconds / 3600);
        const minutes = Math.floor(seconds / 60) - (hours * 60);
        return `${hours}:${minutes}`;
    }

    private static fromEntity(booking: Booking): BookingView {

        const colorPool = ColorPool.instance;

        return ({
            id: booking.id,
            room_id: booking.room_id,
            color: colorPool.getColor(booking.orders[0].id),
            comment: booking.comment_user,
            time: this.transformSecondsToTime(new Date(booking.booking_date).getTime()),
            paymentStatus: EPaymentStatus.NOTPAID,
            confirmStatus: EConfirmStatus.CANCELED,
            title: booking.game.title,
            rooms: [],
            // phone: booking.client.phone ?? '',
            phone: '',
            guestCount: booking.guest_quantity
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
}