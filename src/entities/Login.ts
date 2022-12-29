export interface ILoginData {
    email: string;
    password: string;
    remember: boolean;
}

export interface ILoginResponce {
    error?: any;
    token: string;
    error_text?: string;
    user?: IUser;
}

export interface IUser {
    avatar: string;
    category_loyalty_id: number|null;
    created_at: string;
    email: string;
    email_verified_at: string|null;
    id: number;
    name: string;
    phone: string;
    role_id: number;
    settings: Array<object>;
    temp_password: string|null;
    updated_at: string;
}