import { CellView, CellIndeficator, CellPivot } from "../../entities/Cell";
import { OrderView } from "../../entities/Order";
import { FormBooking, ROOM_PATH, TIME_PATH } from "../../features/booking-creator/ui/OrderCreateForm";

export default class CellMapper {
    static toCell(roomId: number, time: string, date: moment.Moment, pivot: CellPivot | null): CellView {
        return ({
            id: {
                time: time,
                roomId: roomId,
                date: date.format('YYYY-MM-DD')
            },
            pivot: pivot
        })
    }

    static toCellFromOrderView(order: OrderView): CellView[] {
        return order.bookings.map((booking, index) => ({
            id: {
                time: booking.startTime.time,
                roomId: booking.roomId,
                date: order.date.format('YYYY-MM-DD')
            },
            pivot: {
                order: order,
                bookingIndex: index
            }
        })) 
    }

    static toCellFromFormBooking(booking: FormBooking, date: moment.Moment): CellView {
        return ({
            id: {
                time: booking[TIME_PATH],
                roomId: booking[ROOM_PATH],
                date: date.format('YYYY-MM-DD')
            },
            pivot: null
        })
    }
}