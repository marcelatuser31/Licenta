import { IIngredient } from "../../Utils/Models/IIngredient";

export interface IIngredientsListProps {
    setIngredients: (state: IIngredient[]) => void,
    setShouldDisplayNewIngredient: (state: boolean) => void
    isAdded: boolean
}