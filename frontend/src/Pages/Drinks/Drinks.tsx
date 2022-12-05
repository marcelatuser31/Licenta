import { IDropdownOption, Stack, StackItem } from "@fluentui/react";
import axios from "axios";
import { useEffect, useState } from "react"
import { CustomCard } from "../../components/CustomCard/CustomCard";
import { customCardStyle } from "../../components/CustomCard/CustomCard.styles";
import { IFavoriteItem } from "../../components/CustomCard/CustomCard.types";
import { CustomDropdown } from "../../components/CustomDropdown/CustomDropdown";
import { Navbar } from "../../components/Navbar/Navbar";
import { Section } from "../../components/Section/Section";
import { ASCENDING, DESCENDING, FAVORITE_ITEMS_LIST_KEY, SORT_BY_NAME, SORT_BY_PRICE } from "../../Utils/constants";
import { Pages } from "../../Utils/enums";
import { getImageURLfromByteArray } from "../../Utils/methods";
import { IDrink } from "../../Utils/Models/IDrink"
import { DrinkRoutes } from "../../Utils/Routes/backEndRoutes";
import { dividerStyle, itemsContainerStyle, labelSectionStyle } from "../Cakes/Cakes.styles";


const getCard = (drink: IDrink, index: number): JSX.Element => {
    const favoriteList: IFavoriteItem[] = JSON.parse(localStorage.getItem(FAVORITE_ITEMS_LIST_KEY) as string)
    const favoriteItem = favoriteList.find((item: IFavoriteItem) => item.id === drink.id)

    return <div className={customCardStyle} key={index}>
        <CustomCard
            title={drink.name}
            image={getImageURLfromByteArray(drink.image)}
            id={drink.id}
            price={drink.price}
            weight={drink.weight}
            isFavorite={favoriteItem === undefined ? false : true}
            redirectTo={Pages.SelectedDrink}
            hideIngredients={true} />
    </div>
}

export const Drinks = (): JSX.Element => {
    const [drinks, setDrinks] = useState<IDrink[]>([]);
    const [selectedSortPriceOption, setSelectedSortPriceOption] = useState<string>("");
    const [selectedSortNameOption, setSelectedSortNameOption] = useState<string>("");

    useEffect(() => {
        const getData = async (): Promise<void> => {
            const response = await axios.get(DrinkRoutes.GetAll)
            setDrinks(response.data)
        }
        getData()
    }, [])

    const sortByPrice = (): void => {
        let sortDrinkList: IDrink[] = []
        if (selectedSortPriceOption === ASCENDING) {
            sortDrinkList = drinks.sort((a: IDrink, b: IDrink) => b.price - a.price)
        } else {
            sortDrinkList = drinks.sort((a: IDrink, b: IDrink) => a.price - b.price)
        }
        setDrinks(sortDrinkList)
    }

    const sortByName = (): void => {
        let sortDrinkList: IDrink[] = []
        if (selectedSortNameOption === ASCENDING) {
            sortDrinkList = drinks.sort((a: IDrink, b: IDrink) => b.name > a.name ? 1 : -1)
        } else
            sortDrinkList = drinks.sort((a: IDrink, b: IDrink) => a.name > b.name ? 1 : -1)
    }

    const onPriceSortChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
        if (option === undefined)
            return

        setSelectedSortPriceOption(option?.text)
    }

    const onNameSortChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number): void => {
        if (option === undefined)
            return

        setSelectedSortNameOption(option?.text)
    }

    const getSortByPriceContent = (): JSX.Element => {
        return <CustomDropdown
            options={[ASCENDING, DESCENDING]}
            setDefaultValue={setSelectedSortPriceOption}
            defaultValue={selectedSortPriceOption}
            onSelectItem={sortByPrice}
            name={SORT_BY_PRICE} />
    }

    const getSortByNameContent = (): JSX.Element => {
        return <CustomDropdown options={[ASCENDING, DESCENDING]}
            setDefaultValue={setSelectedSortNameOption}
            defaultValue={selectedSortNameOption}
            onSelectItem={sortByName}
            name={SORT_BY_NAME} />
    }

    return <div>
        <Navbar />
        <Stack horizontal={true} gap='80'>
            <StackItem>
                <Stack gap='60'>
                    <Section name={SORT_BY_PRICE} labelStyle={labelSectionStyle} contentValue={getSortByPriceContent()}></Section>
                    <Section name={SORT_BY_NAME} labelStyle={labelSectionStyle} contentValue={getSortByNameContent()}></Section>
                </Stack>
            </StackItem>
            <div className={dividerStyle} />
            <StackItem className={itemsContainerStyle}>
                {
                    drinks.length > 0 && drinks.map((drink: IDrink, index: number) => getCard(drink, index))
                }
            </StackItem>
        </Stack >
    </div >
}