import { SetStateAction } from "react";

export interface ICreditCardData {
    personId?: string,
    cardNumber: string
    cardHolder: string
    expireMonth: string
    expireYear: string
}

export interface ICreditCardProps {
    setCreditCardData: (state: ICreditCardData) => void;
    creditCardData: ICreditCardData | undefined
}