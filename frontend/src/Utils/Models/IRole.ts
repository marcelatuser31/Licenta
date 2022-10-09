import { RoleType } from "../enums";

export interface IRole {
    id?: number;
    username: string;
    password: string;
    email: string;
    type: RoleType;

}