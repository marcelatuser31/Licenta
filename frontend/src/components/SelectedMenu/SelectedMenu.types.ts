import { ICake } from "../../Utils/Models/ICake";

export interface ISelectedMenuProps {
    options: string[],
    setSelectedPriceSortOption: (event: string) => void,
    selectedSortPriceOption: string,
    onSelectItem: () => void
}