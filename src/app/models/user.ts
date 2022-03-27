export interface UserType {
    name: string;
    email: string;
    password: string;
}

export class User {
    name: string = "";
    email: string = "";
    password: string = "";
}