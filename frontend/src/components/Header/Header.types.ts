import { ICakeOrder } from "../../Pages/Cake/Cake.types"

export interface ISize {
    width: number,
    height: number
}

export interface IHeaderProps {
    cakeTypes?: string[],
    setSelectedType?: (state: string) => void,
}