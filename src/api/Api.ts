import axios from "axios";
import { ClientResponse, CreatedClient } from "../entities/Client";
import RoomResponse from "../entities/Room";
import { EmptyOrder, Order, OrderDto, OrderResponse } from "../entities/Order";
import { GameResponse } from "../entities/Game";
import WorkingShiftResponse from "../entities/WorkingShift";
import { ILoginData, ILoginResponce, IUser } from "../entities/Login";
import { getTokenCookie } from "../common/utils/cookesUtils";

export interface ErrorResponse {
    error: number,
    error_text: string
}

const baseUrl = process.env.REACT_APP_API_URL;
const globalUrl = process.env.REACT_APP_API_GLOBAL_URL;


const api = {

    async login(data: ILoginData) {
        // @ts-ignore
        if (data.remember === '1') data.remember = true;
        else data.remember = false;

        return await axios
            .post<ILoginResponce>(
            `${globalUrl}/v2/auth/login`,
            data);
    },

    async getTokenByCookie() {
        const token = getTokenCookie();
        return await axios.post<IUser>(
            `${globalUrl}/v2/auth/loginByRememberedToken`,
            { token }
        );
    },

    getTimeline: async (date: moment.Moment) => {
        return await axios.get<OrderResponse>(
            `${baseUrl}/v2/orders/test`,
            {
                params: {
                    date: date.format('YYYY-MM-DD')
                }
            }
        );
    },
    getRooms: async () => {
        return await axios.get<RoomResponse>(`${baseUrl}/rooms`);
    },
    getGames: async () => {
        return await axios.get<GameResponse>(`${baseUrl}/games`);
    },
    getWorkingParams: async () => {
        return await axios.get<WorkingShiftResponse>(`${baseUrl}/v2/work-times`);
    },
    getClientsByPhone: async (phoneNumber: string) => {
        return await axios.get<ClientResponse>(
            `${baseUrl}/v2/client/getByPhone`,
            {
                params: {
                    phone: phoneNumber
                }
            }
        );
    },
    createOrder: async (order: OrderDto) => {
        return await axios.post<Order | ErrorResponse>(
            `${baseUrl}/v2/booking/admin`,
            order
        );
    },
    validatePromoCode: async (promoCode: string, price: number, gameId: number) => {
        return await axios.post(
            `${baseUrl}/v2/promo/activate`,
            {
                token: '6bc8a47477b1427a6ae7f4e13789aea32c77ec29',
                promo_code: promoCode,
                price: price,
                game: gameId
            }
        );
    },
    precreateOrder: async () => {
        return await axios.post<EmptyOrder>(
            `${baseUrl}/v2/orders/createEmpty`
        );
    },
    getBonusInfo: async () => {

    },
    hotRegister: async (name: string, phone: string) => {
        return await axios.get<CreatedClient>(
            `${globalUrl}/v2/client/hotRegister`,
            {
                params: {
                    name: name,
                    phone: phone
                }
            }
        );
    }
};

export default api;