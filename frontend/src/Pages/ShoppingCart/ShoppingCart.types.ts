import { ICakeOrder } from "../Cake/Cake.types";

export interface IDrinkDTO {
    id: number,
    amount: number
}
export interface ICakeDTO {
    id: number,
    amount: number
}

export interface IOrderData {
    cakes?: ICakeDTO[],
    id: number,
    drinks?: IDrinkDTO[]
}