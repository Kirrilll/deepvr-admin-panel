import { BookingView } from "../../entities/Booking";
import { GameView } from "../../entities/Game";
import { FormBooking, GAME_PATH, GUEST_COUNT_PATH, ROOM_PATH, TIME_PATH } from "../../features/booking-creator/ui/OrderCreateForm";

export default class BookingHelper {

    static getAmount(games: GameView[], formBookings?: FormBooking[]): number {
        if(formBookings === undefined) return 0;
        if(formBookings.length === 0) return 0;
        return formBookings
            .map(booking => {
                const guestCount = booking[GUEST_COUNT_PATH] ?? 0;
                const price = games.find(game => game.id == booking[GAME_PATH])?.price ?? 0;
                return guestCount * price;
            })
            .reduce((prev, next) => prev + next);
    }

    static isSameView(fBooking: BookingView, sBooking: BookingView) {
        if (fBooking.id != sBooking.id) return false;
        if (fBooking.comment != sBooking.comment) return false;
        if (fBooking.confirmStatus != sBooking.confirmStatus) return false;
        if (fBooking.gameId != sBooking.gameId) return false;
        if (fBooking.guestCount != sBooking.roomId) return false;
        if (fBooking.startTime.time != sBooking.startTime.time) return false;
        return true;
    }

    static isSameViews(fBookings: BookingView[], sBooking: BookingView[]): boolean {
        if (fBookings.length != sBooking.length) return false;
        for (let index = 0; index < fBookings.length; index++) {
            if (!BookingHelper.isSameView(fBookings[index], sBooking[index])) {
                return false;
            }
        }
        return true;
    }

    static isSame(fBooking: FormBooking, sBooking: FormBooking) {
        return fBooking[ROOM_PATH] === sBooking[ROOM_PATH] && fBooking[TIME_PATH] === sBooking[TIME_PATH];
    }

    static bookingsRightJoin(prevBookings: FormBooking[], bookings: FormBooking[]): FormBooking[] {
        const bookingJoined: FormBooking[] = []
        for (const booking of bookings) {
            const prevBookingIndex = prevBookings.findIndex(prevBooking => BookingHelper.isSame(booking, prevBooking));
            if (~prevBookingIndex) bookingJoined.push(prevBookings[prevBookingIndex]);
            else bookingJoined.push(booking)
        }
        return bookingJoined;
    }
}