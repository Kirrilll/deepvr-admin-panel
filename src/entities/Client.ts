import { LabeledValue } from "antd/lib/select";
import { type } from "os";

interface Client {
    id: number;
    role_id: number;
    name: string;
    email: string;
    avatar: string;
    email_verified_at?: any;
    settings: any[];
    created_at: Date;
    updated_at: Date;
    phone: string;
    category_loyalty_id?: any;
}


export interface CreatedClient {
    name: string;
    phone: string;
    role_id: number;
    updated_at: Date;
    created_at: Date;
    id: number;
}


export type ClientValue = LabeledValue & { client: Client };
export type ClientResponse = Client[];
export default Client;