export const serverURL: string = "http://localhost:8081";

export namespace RoleRoutes {
    export const LogIn: string = `${serverURL}/Role/LogIn`;
    export const Logout: string = `${serverURL}/Role/LogOut`;
}

export namespace CakeRoutes {
    export const GetAll: string = `${serverURL}/Cake/getAll`
    export const GetTypes: string = `${serverURL}/Cake/getCakeTypes`
    export const GetCakesByType: string = `${serverURL}/Cake/getByType`
    export const AddImage: string = `${serverURL}/Cake/addImage`
    export const AddCake: string = `${serverURL}/Cake/addCake`
}

export namespace PersonRoutes {
    export const Register: string = `${serverURL}/Person/register`
    export const AddImage: string = `${serverURL}/Person/addImage`
    export const GetById: string = `${serverURL}/Person/getById`
    export const Update: string = `${serverURL}/Person/update`
}

export namespace OrderRoutes {
    export const AddOrder: string = `${serverURL}/Order/addOrder`
}

export namespace DrinkRoutes {
    export const GetAll: string = `${serverURL}/Drink/getAll`
    export const AddDrink: string = `${serverURL}/Drink/addDrink`
    export const AddImage: string = `${serverURL}/Drink/addImage`
}

export namespace IngredientRoutes {
    export const GetAll: string = `${serverURL}/Ingredient/getAll`
    export const AddIngredient: string = `${serverURL}/Ingredient/insert`
}