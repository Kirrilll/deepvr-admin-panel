import { BookingView } from "./Booking"
import { OrderView } from "./Order"

export interface CellPivot {
    order: OrderView,
    bookingIndex: number
}

export interface CellIndeficator {
    time: string,
    roomId: number,
    date: string
}

export interface CellView {
    id: CellIndeficator,
    pivot: CellPivot | null
}