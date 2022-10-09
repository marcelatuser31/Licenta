import { Home } from "../Pages/Home/Home";
import { LogIn } from "../Pages/LogIn/LogIn";
import { Register } from "../Pages/Register/Register";

export interface IRoute {
    path: string;
    element: JSX.Element;
}

export const routes: IRoute[] = [
    {
        path: '/LogIn',
        element: <LogIn />
    },
    {
        path: '/Home',
        element: <Home />
    },
    {
        path: '/Register',
        element: <Register />
    }
]