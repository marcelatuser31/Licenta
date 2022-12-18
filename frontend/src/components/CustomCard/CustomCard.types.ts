import { IIngredient } from "../../Utils/Models/IIngredient"

export interface ICardProps {
    title: string;
    expirationDate?: Date;
    ingredients?: IIngredient[];
    image: string;
    id: string;
    price: number;
    weight?: number;
    isFavorite: boolean;
    redirectTo: string;
    hideIngredients?: boolean;
}

export interface IFavoriteItem {
    id: string,
    name: string,
    price: number
}