


//Большая сущность - плиточка,
//Номер заказа это id Order
//Время указано в большой сущности

import moment from "moment";
import OrderView, { EConfirmStatus, EPaymentStatus } from "../../entities/OrderView";
import { Order } from "../../entities/Order";
import TimeHelper from "../helpers/TimeHelper";
import ColorPool from "../utils/color/ColorPool";
import TimeMapper from "./TimeMapper";


//BookingInfo - сущночть плиточки(заказ), имеет цвет(он конструируется относительно id брони)
//В ЗАКАЗЕ есть id комнаты
//в заказе есьь id ЗАКАЗА, это key для JSX


//TODO вынести всю работу со временем в TimeHelper
export default class OrderMapper {

    private static readonly _colorPool = ColorPool.instance;


    private static _transformConfirmStatus(status: string): EConfirmStatus {
        switch (status) {
            case '-1':
                return EConfirmStatus.CANCELED;
            case '0':
                return EConfirmStatus.NOTCONFIRM;
            case '1':
                return EConfirmStatus.CONFIRM;
            default:
                throw Error('Wrong status code');
        }
    }

    static fromEntities(orders: Order[]) {
        return orders.map(order => OrderMapper.fromEntity(order));
    }

    static fromEntity(order: Order): OrderView {
        return ({
            id: order.id,
            phone: `8 ${order.client.phone}`,
            clientName: order.client.name,
            comment: order.comment,
            date: moment(new Date(order.booking_date)),
            color: OrderMapper._colorPool.getColor(order.id),
            paymentStatus: order.paymentInfo.is_payed ? EPaymentStatus.PAID : EPaymentStatus.NOTPAID,
            bookings: order.bookings.map(booking => ({
                id: booking.id,
                confirmStatus: OrderMapper._transformConfirmStatus(booking.status),
                gameTitle: booking.game.title,
                guestCount: booking.guest_quantity,
                startTime: TimeHelper.fromDateToTime(new Date(booking.booking_date)),
                durationMin: booking.time_duration,
                roomId: booking.room_id,
                gameId: booking.game.id,
                comment: booking.comment,
            }))
        })
    }
}