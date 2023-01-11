import { IIngredient } from "../../Utils/Models/IIngredient";

export interface IIngredientsListProps {
    selectedIngredients?: IIngredient[];
    availableIngredients?: IIngredient[];
    setIngredients: (state: IIngredient[]) => void,
    setShouldDisplayNewIngredient: (state: boolean) => void
    isAdded: boolean
}