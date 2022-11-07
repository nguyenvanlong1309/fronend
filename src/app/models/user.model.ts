export interface LoginModel {
    username: string;
    password: string;
}

export interface User {
    username: string;
    password: string;
    fullName: string;
    role: string;
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
}