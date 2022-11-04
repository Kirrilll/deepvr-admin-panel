import axios from "axios";
import { OrderView } from "../components/BookingCreateModal";
import BookingResponse from "../entities/Booking";
import { ClientResponse } from "../entities/Client";
import RoomResponse from "../entities/Room";
import BookingMapper from "../mappers/BookingMapper";

const baseUrl = process.env.REACT_APP_API_URL;
const api = {
    getTimeline: async (date: moment.Moment) => {
        return await axios.get<BookingResponse>(
            `${baseUrl}/v2/orders`,
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
    createBooking: async (order: OrderView, token: string) => {
        console.log(JSON.stringify(BookingMapper.toOrder(order, token)));
        return await axios.post(
            `${baseUrl}/v2/booking/admin`,
           BookingMapper.toOrder(order, token) 
        )
    }
}

export default api;