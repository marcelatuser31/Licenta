import { SelectedCake } from "../Pages/SelectedItem/SelectedCake";
import { Drinks } from "../Pages/Drinks/Drinks";
import { Cakes } from "../Pages/Cakes/Cakes";
import { LogIn } from "../Pages/LogIn/LogIn";
import { Profile } from "../Pages/Profile/Profile";
import { Register } from "../Pages/Register/Register";
import { ShoppingCart } from "../Pages/ShoppingCart/ShoppingCart";
import { SelectedDrink } from "../Pages/SelectedItem/SelectedDrink";
import { Home } from "../Pages/Home/Home";

export interface IRoute {
    path: string;
    element: JSX.Element;
}

export const routes: IRoute[] = [
    {
        path: '/',
        element: <LogIn />
    },
    {
        path: '/LogIn',
        element: <LogIn />
    },
    {
        path: '/Cakes',
        element: <Cakes />
    },
    {
        path: '/Register',
        element: <Register />
    },
    {
        path: '/SelectedCake',
        element: <SelectedCake />
    },
    {
        path: '/ShoppingCart',
        element: <ShoppingCart />
    },
    {
        path: '/Profile',
        element: <Profile />
    },
    {
        path: '/Drinks',
        element: <Drinks />
    },
    {
        path: '/SelectedDrink',
        element: <SelectedDrink />
    },
    {
        path: '/Home',
        element: <Home />
    }
]