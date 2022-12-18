import { IRole } from "./IRole";

export interface IPerson {
    id?: string;
    name: string;
    address: string;
    phone: string;
    role: IRole;
    isActive: boolean;
    image?: string;
}