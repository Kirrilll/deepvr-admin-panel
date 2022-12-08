export const enum EPaymentStatus {
    PAID = 'Оплачено',
    NOTPAID = 'Не оплачено'
}

export const enum EConfirmStatus {
    CONFIRM = 'Подтверждено',
    NOTCONFIRM = 'Не подтверждено',
    CANCELED = 'Отменено'
}

export interface Cart {
    title: string;
    quantity: number;
    amount: number;
}

export interface PaymentInfo {
    order_id: number;
    is_payed: boolean;
    accepted?: any;
    instance?: any;
    client_id: number;
    transactions: any[];
    promo?: any;
    bonus: number;
    amount: number;
    amount_without_discount: number;
    payed_real: number;
    need_to_pay: number;
    cart: Cart[];
}