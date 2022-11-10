import axios from "axios";
import { ClientResponse } from "../entities/Client";
import RoomResponse from "../entities/Room";
import { OrderResponse } from "../entities/Order";

const baseUrl = process.env.REACT_APP_API_URL;
const api = {
    getTimeline: async (date: moment.Moment) => {
        return await axios.get<OrderResponse>(
            `${baseUrl}/v2/orders/test`,
            {
                params: {
                    date: date.calendar({ sameDay: (today) => 'YYYY-MM-DD' })
                }
            }
        )
    },
    getRooms: async () => {
        return await axios.get<RoomResponse>(`${baseUrl}/rooms`)
    },
    getClientsByPhone: async (phoneNumber: string) => {
        return await axios.get<ClientResponse>(
            `${baseUrl}/v2/client/getByPhone`,
            {
                params:{
                    phone: phoneNumber
                }
            }
        )
    },
    // createBooking: async (order: OrderView, token: string) => {
    //     console.log(JSON.stringify(OrderMapper.toOrder(order, token)));
    //     return await axios.post(
    //         `${baseUrl}/v2/booking/admin`,
    //        OrderMapper.toOrder(order, token) 
    //     )
    // }
}

export default api;