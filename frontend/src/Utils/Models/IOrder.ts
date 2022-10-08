import { ICake } from "./ICake";
import { IDrink } from "./IDrink";
import { IPerson } from "./IPerson";

export interface IOrder{
    id:number;
    person:IPerson;
    cakes:ICake[];
    drinks:IDrink[];
    date:Date;
}