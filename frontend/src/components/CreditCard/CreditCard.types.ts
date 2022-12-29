export interface ICreditCardData {
    personId: string,
    cardNumber: string,
    cardHolder: string,
    expireMonth: string,
    expireYear: string
}

export interface ICreditCardProps {
    setCardNumber: (state: React.SetStateAction<string>) => void;
    setCardHolder: (state: React.SetStateAction<string>) => void
    setExpireMonth: (state: React.SetStateAction<string>) => void
    setExpireYear: (state: React.SetStateAction<string>) => void
    cardNumber: string
    cardHolder: string
    expireMonth: string
    expireYear: string
}