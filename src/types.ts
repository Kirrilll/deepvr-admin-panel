
export const enum EPaymentStatus {
    PAID = 'Оплачено',
    NOTPAID = 'Не оплачено'
}

export const enum EConfirmStatus {
    CONFIRM = 'Подтверждено',
    NOTCONFIRM = 'Не подтверждено',
    CANCELED = 'Отменено'
}

export interface BookingInfo{
    id: number,
    paymentStatus: EPaymentStatus,
    confirmStatus: EConfirmStatus,
    title: string,
    phone: string,
    guestCount: number,
    rooms: Array<string>,
    time: string,
    comment: string
}