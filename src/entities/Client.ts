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

export default Client;