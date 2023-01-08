import { ICake } from "../../Utils/Models/ICake";

export interface INavbarProps {
    onSearch?: (event: any) => any;
    searchedItem?: string
    displaySearch?: boolean
}