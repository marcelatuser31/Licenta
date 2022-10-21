export const serverURL: string = "http://localhost:8081";

export namespace RoleRoutes {
    export const LogIn: string = `${serverURL}/Role/LogIn`;
}

export namespace CakeRoutes {
    export const GetAll: string = `${serverURL}/Cake/getAll`
    export const GetTypes: string = `${serverURL}/Cake/getCakeTypes`
    export const GetCakesByType: string = `${serverURL}/Cake/readByType`
    export const AddImage: string = `${serverURL}/Cake/addImage`
}

export namespace PersonRoutes {
    export const Register: string = `${serverURL}/Person/register`
}

