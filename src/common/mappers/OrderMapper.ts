


//Большая сущность - плиточка,
//Номер заказа это id Order
//Время указано в большой сущности

import moment from "moment";
import OrderView, { EConfirmStatus, EPaymentStatus } from "../../entities/OrderView";
import { Order } from "../../entities/Order";
import TimeHelper from "../helpers/TimeHelper";
import ColorPool from "../utils/color/ColorPool";
import WorkingParamsMapper from "./WorkingParamsMapper";
import OrderCreation from "../../entities/OrderCreation";
import { CellIndeficator } from "../../features/timeline/redux/slice";
import { Booking, FormState } from "../../features/booking-creator/ui/OrderCreateForm";


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

    private static _confirmStatusToNum(status: EConfirmStatus): number {
        switch (status) {
            case EConfirmStatus.CANCELED:
                return -1;
            case EConfirmStatus.NOTCONFIRM:
                return 0;
            case EConfirmStatus.CONFIRM:
                return 1;
            default:
                throw Error('Wrong status');
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

    //Fix this, get confirmStatus from orderView
    static fromViewToCreation(orderView: OrderView): OrderCreation {
        return {
            confirmStatus: EConfirmStatus.NOTCONFIRM,
            ...orderView
        };
    }

    static fromCells(cells: CellIndeficator[], id: number): OrderCreation {
        const unionDate = cells[0].date;
        return ({
            id: id,
            paymentStatus: EPaymentStatus.NOTPAID,
            confirmStatus: EConfirmStatus.CONFIRM,
            date: moment(unionDate),
            bookings: cells.map(cell => ({
                startTime: TimeHelper.transformStringToTime(cell.time),
                roomId: cell.roomId
            }))
        })
    }

    static fromCreationToForm(order: OrderCreation): FormState {
        return ({
            employeeCode: '',
            paymentStatus: order.paymentStatus == EPaymentStatus.PAID ? 1 : 0,
            confirmStatus: OrderMapper._confirmStatusToNum(order.confirmStatus),
            phonePicker: order.phone ?? '',
            name: order.clientName ?? '',
            datePicker: order.date,
            certificates: [],
            isBonuses: false,
            bookings: order.bookings.map<Booking>(booking => ({
                time: booking.startTime.time,
                gameId: booking.gameId ?? null,
                roomId: booking.roomId,
                guestCount: booking.guestCount ?? null
            }))
        
        });
    }
}