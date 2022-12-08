
import { OrderView } from "../../entities/Order";
import BookingHelper from "./BookingHelper";

export default class OrderHelper{
    static isOrdersSame(orderFirst: OrderView, orderSecond: OrderView){
        if(orderFirst.id != orderSecond.id) return false;
        if(!orderFirst.date.isSame(orderSecond.date, 'date')) return false;
        if(orderFirst.phone != orderSecond.phone) return false;
        if(orderFirst.clientName != orderSecond.clientName) return false;
        if(orderFirst.paymentStatus != orderSecond.paymentStatus) return false;
        if(!BookingHelper.isSameViews(orderFirst.bookings, orderSecond.bookings)) return false;
        return true;
    }
}