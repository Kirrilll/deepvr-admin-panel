import { BookingCreation } from "../../entities/OrderCreation";
import { FormBooking, ROOM_PATH, TIME_PATH } from "../../features/booking-creator/ui/OrderCreateForm";
import { CellIndeficator } from "../../features/timeline/redux/slice";
import TimeHelper from "../helpers/TimeHelper";
import OrderMapper from "./OrderMapper";

export default class BookingMapper {


    
    static bookingFromCell(cell: CellIndeficator): BookingCreation {
        return ({
            startTime: TimeHelper.transformStringToTime(cell.time),
            roomId: cell.roomId
        });
    }

    static bookingToFormBooking(booking: BookingCreation): FormBooking {
        return ({
            time: booking.startTime.time,
            gameId: booking.gameId ?? null,
            roomId: booking.roomId,
            guestCount: booking.guestCount ?? null,
        })
    }

    static toFormBookingFromCells(cell: CellIndeficator): FormBooking{
        return ({
            time: cell.time,
            gameId: null,
            roomId: cell.roomId,
            guestCount: null,
        })
    }

    static toFormBooking(cell: CellIndeficator): FormBooking{
        
        return BookingMapper.bookingToFormBooking(BookingMapper.bookingFromCell(cell));
    }

    static toFormBookings(cells: CellIndeficator[]): FormBooking[] {
        //console.log(cells);

        const formBookings =  cells.map(cell => BookingMapper.toFormBookingFromCells(cell));
        //console.log(formBookings);
        return formBookings;
    }

    static toCell (booking: FormBooking, date: string): CellIndeficator {
        return ({
            time: booking[TIME_PATH],
            roomId: booking[ROOM_PATH],
            date: date
        })
    }


}