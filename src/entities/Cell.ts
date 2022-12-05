import { BookingView } from "./Booking"
import { OrderView } from "./Order"


export interface CellIndeficator {
    time: string,
    roomId: number,
    date: string
}

export interface Cell{
    id: CellIndeficator,
    pivot: {
        order: Omit<OrderView, 'bookings'>,
        booking: BookingView
    }
}