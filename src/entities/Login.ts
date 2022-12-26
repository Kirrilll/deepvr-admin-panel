export interface ILoginData {
    phone: string;
    password: string;
}

export interface ILoginResponce {
    error?: any;
    token: string;
}