import { IItem } from "../SelectedItem/SelectedCake.types";

export interface IItemDTO {
    id: string,
    amount: number,
    price: number
}

export interface IOrderData {
    cakes?: IItemDTO[],
    id: string,
    drinks?: IItemDTO[],
    address: string
    paymentMethod: string
}

export interface IShoppingList {
    cakes: IItem[];
    drinks: IItem[];
};