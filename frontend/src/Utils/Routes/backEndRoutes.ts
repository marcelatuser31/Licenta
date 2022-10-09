export const serverURL: string = "http://localhost:8081";

export namespace RoleRoutes {
    export const LogIn: string = `${serverURL}/Role/LogIn`;
}

export namespace CakeRoutes {
    export const ReadAll: string = `${serverURL}/Cake/ReadAll`
}

export namespace PersonRoutes {
    export const Register: string = `${serverURL}/Person/register`
}