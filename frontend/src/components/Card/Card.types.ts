import { IIngredient } from "../../Utils/Models/IIngredient"

export interface ICardProps {
    title: string;
    expirationDate: Date;
    ingredients: IIngredient[];
}