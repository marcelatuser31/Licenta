import { IIngredient } from "../../Utils/Models/IIngredient"

export interface ICardProps {
    title: string;
    expirationDate: Date;
    ingredients: IIngredient[];
    image: string;
    id: number;
    price: number;
    weight?: number;
}

export interface IFavoriteItem {
    id: number,
    name: string,
    price: number
}