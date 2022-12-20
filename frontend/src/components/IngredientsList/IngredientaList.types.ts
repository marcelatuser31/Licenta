import { IIngredient } from "../../Utils/Models/IIngredient";

export interface IIngredientsList {
    setIngredients: (state: IIngredient[]) => void,
    setAddIngredient: (state: boolean) => void
    isAdded: boolean
}