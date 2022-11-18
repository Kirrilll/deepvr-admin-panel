import { LabeledValue } from "antd/lib/select";
import ClientMapper from "../common/mappers/ClientMapper";
import api from "../repositories/Api";

class BookingModalService {
    async fetchClientsByPhone(phone: string) {
        const cutRegEx: RegExp = /^8|(\+7)/;
        const cuttedPhone = phone.trim().replace(cutRegEx, '');
        const response =  await api.getClientsByPhone(cuttedPhone);
        return ClientMapper.clientsToSelector(response.data);
    }
}

export default BookingModalService;