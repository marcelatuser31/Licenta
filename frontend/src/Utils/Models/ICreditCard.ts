import { IPerson } from "./IPerson";

export interface ICreditCard {
    id: string,
    person: IPerson,
    cardNumber: string,
    cardHolder: string,
    expireMonth: string,
    expireYear: string
}