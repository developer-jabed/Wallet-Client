export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: "user" | "agent" | "admin";
}

export interface LoginResponse {
    token: string;
    user: User;
}
