import { IItemOrder } from "../Cake/Cake.types";

export interface IItemDTO {
    id: number,
    amount: number
}

export interface IOrderData {
    cakes?: IItemDTO[],
    id: number,
    drinks?: IItemDTO[]
}