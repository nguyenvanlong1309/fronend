export interface LoginModel {
    username: string;
    password: string;
}

export interface User {
    username: string;
    password: string;
    fullName: string;
    id: string;
    address: string;
    phone: string;
    email: string;
}

export interface UserModel {
    token: string;
    user: UserResponseModel;
}

export interface UserResponseModel {
    id: string;
    username: string;
    fullName: string;
    role: string;
    address: string;
    phone: string;
    email: string;
    status: 0 | 1;
}