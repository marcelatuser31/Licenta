import { IRole } from "./IRole";

export interface IPerson {
    id?: number;
    name: string;
    address: string;
    phone: string;
    role: IRole;
    isActive: boolean;
    image?: any;
} 