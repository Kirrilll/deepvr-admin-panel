import axios from "axios";
import { ClientResponse, CreatedClient } from "../entities/Client";
import { GameResponse } from "../entities/Game";
import { ILoginData, ILoginResponce } from "../entities/Login";
import { OrderResponse, OrderDto, Order, EmptyOrder } from "../entities/Order";
import RoomResponse from "../entities/Room";
import WorkingShiftResponse from "../entities/WorkingShift";
import { createOrder, precreateOrder } from "../features/booking-creator/redux/asyncActions";
import { getWorkingParams } from "../features/game/redux/asyncActions";
import { ErrorResponse } from "./Api";

export class FilialApi {
    static readonly instance = new FilialApi();

    private url = '';

    private constructor() { };

    //Используется в слайсе при выбое города
    init(url: string) {
        this.url = url;
    }

    async getTimeline(date: moment.Moment) {
        return await axios.get<OrderResponse>(
            `${this.url}/v2/orders/test`,
            {
                params: {
                    date: date.format('YYYY-MM-DD')
                }
            }
        );
    };
    async getRooms() {
        return await axios.get<RoomResponse>(`${this.url}/rooms`);
    };
    async getGames() {
        return await axios.get<GameResponse>(`${this.url}/games`);
    };
    async getWorkingParams() {
        return await axios.get<WorkingShiftResponse>(`${this.url}/v2/work-times`);
    };
    async createOrder(order: OrderDto) {
        return await axios.post<Order | ErrorResponse>(
            `${this.url}/v2/booking/admin`,
            order
        );
    };
    async validatePromoCode(promoCode: string, price: number, gameId: number) {
        return await axios.post(
            `${this.url}/v2/promo/activate`,
            {
                token: '6bc8a47477b1427a6ae7f4e13789aea32c77ec29',
                promo_code: promoCode,
                price: price,
                game: gameId
            }
        );
    };
    async precreateOrder() {
        return await axios.post<EmptyOrder>(
            `${this.url}/v2/orders/createEmpty`
        );
    };
    async getBonusInfo() {

    };
}
