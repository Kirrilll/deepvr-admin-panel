import axios from "axios";
import BookingResponse from "../entities/Booking";
import RoomResponse from "../entities/Room";

const baseUrl = process.env.REACT_APP_API_URL;

const timelineService = {
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
    }
}

export default timelineService;