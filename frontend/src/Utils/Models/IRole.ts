import { RoleType } from "../enums";

export interface IRole {
    id?: string;
    username: string;
    password: string;
    email: string;
    type: RoleType;
}