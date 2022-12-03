import { IIngredient } from "./IIngredient";

export interface ICake {
    id: number;
    name: string;
    price: number;
    weight: number;
    amount: number;
    ingredients: IIngredient[];
    expirationDate?: Date;
    image: string;
}