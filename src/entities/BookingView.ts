export const enum EPaymentStatus {
    PAID = 'Оплачено',
    NOTPAID = 'Не оплачено'
}

export const enum EConfirmStatus {
    CONFIRM = 'Подтверждено',
    NOTCONFIRM = 'Не подтверждено',
    CANCELED = 'Отменено'
}

interface BookingView {
    id: number,
    date: Date,
    room_id: number,
    paymentStatus: EPaymentStatus,
    confirmStatus: EConfirmStatus,
    title: string,
    phone: string,
    guestCount: number,
    timeStart: string,
    timeEnd: string,
    comment: string,
    color: string
}


export default BookingView;
