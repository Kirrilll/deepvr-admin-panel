


//Большая сущность - плиточка,
//Номер заказа это id Order
//Время указано в большой сущности

import moment from "moment";

import { Order, OrderCreation, OrderDto, OrderView } from "../../entities/Order";
import TimeHelper from "../helpers/TimeHelper";
import ColorPool from "../utils/color/ColorPool";
import { CellIndeficator } from "../../features/timeline/redux/slice";
import { BOOKING_LIST_PATH, CERTIFACATES_PATH, CONFRIM_STATUS_PATH, DATE_PICKER_PATH, EMLOYEE_CODE_PATH, FormBooking, GAME_PATH, GUEST_COUNT_PATH, NAME_PATH, OrderFormState, ORDER_ID_PATH, PHONE_PICKER_PATH, PROMOCODE_PATH, ROOM_PATH, TIME_PATH } from "../../features/booking-creator/ui/OrderCreateForm";
import BookingMapper from "./BookingMapper";
import { EConfirmStatus, EPaymentStatus } from "../../entities/PaymentInfo";



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
            phone: `${order.client.phone}`,
            clientName: order.client.name,
            comment: order.comment,
            date: moment(new Date(order.booking_date)),
            color: OrderMapper._colorPool.getColor(order.id),
            confirmStatus: OrderMapper._transformConfirmStatus(order.status.toString()),
            paymentStatus: order.paymentInfo.is_payed ? EPaymentStatus.PAID : EPaymentStatus.NOTPAID,
            bookings: order.bookings.map(booking => ({
                id: booking.id,
                confirmStatus: OrderMapper._transformConfirmStatus(booking.status),
                gameTitle: booking.game.title,
                price: booking.price,
                guestCount: booking.guest_quantity,
                startTime: TimeHelper.fromDateToTime(new Date(booking.booking_date)),
                durationMin: booking.time_duration,
                roomId: booking.room_id,
                gameId: booking.game.id,
                comment: booking.comment,
            }))
        })
    }

    static fromViewToCreation(orderView: OrderView): OrderCreation {
        return {...orderView};
    }

    static fromCells(cells: CellIndeficator[], id: number): OrderCreation {
        const unionDate = cells[0].date;
        return ({
            id: id,
            paymentStatus: EPaymentStatus.NOTPAID,
            confirmStatus: EConfirmStatus.CONFIRM,
            date: moment(new Date(unionDate)),
            bookings: cells.map(cell => BookingMapper.bookingFromCell(cell))
        })
    }


    static fromCreationToForm(order: OrderCreation): OrderFormState {
        return ({
            id: order.id,
            employeeCode: '',
            paymentStatus: order.paymentStatus == EPaymentStatus.PAID ? 1 : 0,
            confirmStatus: OrderMapper._confirmStatusToNum(order.confirmStatus),
            phonePicker: order.phone ?? '',
            name: order.clientName ?? '',
            datePicker: order.date,
            certificates: [],
            isBonuses: false,
            bookings: order.bookings.map<FormBooking>(booking => BookingMapper.bookingToFormBooking(booking))
        });
    }

    static toDtoFromForm(order: OrderFormState): OrderDto {
        return({
            id: order[ORDER_ID_PATH],
            name: order[NAME_PATH],
            phone: order[PHONE_PICKER_PATH],
            status: order[CONFRIM_STATUS_PATH].toString(),
            employee_code: order[EMLOYEE_CODE_PATH],
            token: '6bc8a47477b1427a6ae7f4e13789aea32c77ec29',
            date: order[DATE_PICKER_PATH].format('YYYY-MM-DD'),
            certificates: order[CERTIFACATES_PATH].map(certificate => ({
                code: certificate
            })),
            bonus: null,
            promo_code: order[PROMOCODE_PATH] ?? '',
            bookings: order[BOOKING_LIST_PATH].map(booking => ({
                id: null,
                game_id: booking[GAME_PATH] ?? -1,
                room_id: booking[ROOM_PATH],
                time: booking[TIME_PATH],
                guest_quantity: booking[GUEST_COUNT_PATH] ?? 0
            })),
            comment: ''
        })
    }
}