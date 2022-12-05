import { ChoiceGroup, IChoiceGroupOption, IDropdownOption, Stack, StackItem } from "@fluentui/react"
import { styled } from "@mui/material"
import axios from "axios"
import * as React from 'react'
import { useEffect, useState } from "react"
import { customCardStyle } from "../../components/CustomCard/CustomCard.styles"
import { CustomCard } from "../../components/CustomCard/CustomCard"
import { CustomDropdown } from "../../components/CustomDropdown/CustomDropdown"
import { Navbar } from "../../components/Navbar/Navbar"
import { Section } from "../../components/Section/Section"
import { dividerStyle, itemsContainerStyle, labelSectionStyle, selectedMenuStyle } from './Cakes.styles'
import { ASCENDING, DESCENDING, FAVORITE_ITEMS_LIST_KEY, FILTER_BY_TYPE, HEADERS, SORT_BY_NAME, SORT_BY_PRICE } from "../../Utils/constants"
import { getImageURLfromByteArray } from "../../Utils/methods"
import { ICake } from "../../Utils/Models/ICake"
import { CakeRoutes } from "../../Utils/Routes/backEndRoutes"
import { choiceGroupStyle } from "./Cakes.styles"
import { IFavoriteItem } from "../../components/CustomCard/CustomCard.types"
import { Pages } from "../../Utils/enums"

export const Input = styled('input')({ display: 'none' })
const getCard = (cake: ICake, index: number): JSX.Element => {
    const favoriteList: IFavoriteItem[] = JSON.parse(localStorage.getItem(FAVORITE_ITEMS_LIST_KEY) as string)
    const favoriteItem = favoriteList.find((item: IFavoriteItem) => item.id === cake.id);
    return <div className={customCardStyle} key={index}>
        <CustomCard
            id={cake.id}
            title={cake.name}
            expirationDate={cake.expirationDate}
            ingredients={cake.ingredients}
            image={getImageURLfromByteArray(cake.image)}
            price={cake.price}
            weight={cake.weight}
            isFavorite={favoriteItem === undefined ? false : true}
            redirectTo={Pages.SelectedCake} />
    </div>
}

export const Cakes = (): JSX.Element => {
    const [cakes, setCakes] = useState<ICake[]>([])
    const [cakeTypes, setCakeTypes] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState<string>('All');
    const [selectedSortPriceOption, setSelectedSortPriceOption] = useState<string>("");
    const [selectedSortNameOption, setSelectedSortNameOption] = useState<string>("");

    const sortByPrice = (): void => {
        let sortCakeList: ICake[] = []
        if (selectedSortPriceOption === ASCENDING) {
            sortCakeList = cakes.sort((a: ICake, b: ICake) => b.price - a.price)
        } else {
            sortCakeList = cakes.sort((a: ICake, b: ICake) => a.price - b.price)
        }
        setCakes(sortCakeList)
    }

    const sortByName = (): void => {
        let sortCakeList: ICake[] = []
        if (selectedSortNameOption === ASCENDING) {
            sortCakeList = cakes.sort((a: ICake, b: ICake) => b.name > a.name ? 1 : -1)
        } else {
            sortCakeList = cakes.sort((a: ICake, b: ICake) => a.name > b.name ? 1 : -1)
        }
        setCakes(sortCakeList)
    }

    useEffect(() => {
        const getCakesByType = async (): Promise<any> => {
            if (selectedType === 'All') {
                const response = await axios.get(CakeRoutes.GetAll)
                setCakes(response.data)
            } else {
                const response = await axios.post(CakeRoutes.GetCakesByType, cakeTypes.indexOf(selectedType), { headers: HEADERS })
                setCakes(response.data)
            }
        }
        getCakesByType()
    }, [selectedType])

    useEffect(() => {
        const getData = async (): Promise<void> => {
            let response = await axios.get(CakeRoutes.GetAll)
            setCakes(response.data)

            response = await axios.get(CakeRoutes.GetTypes);
            const types: string[] = response.data
            types.push('All');
            setCakeTypes(types)
        }
        getData()
    }, [])

    const options: IChoiceGroupOption[] =
        cakeTypes.map((type: string) => {
            return {
                key: type,
                text: type
            }
        })

    const onChoiceGroupChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, option?: IChoiceGroupOption | undefined): void => {
        if (option === undefined)
            return

        setSelectedType(option.text)
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

    const getFilterContent = (): JSX.Element => {
        return <ChoiceGroup
            onChange={onChoiceGroupChange}
            className={choiceGroupStyle}
            defaultSelectedKey="B"
            options={options}
        />
    }

    const getSortByNameContent = (): JSX.Element => {
        return <div className={selectedMenuStyle}>
            <CustomDropdown
                options={[ASCENDING, DESCENDING]}
                setDefaultValue={setSelectedSortNameOption}
                defaultValue={selectedSortNameOption}
                onSelectItem={sortByName}
                name={SORT_BY_NAME} />
        </div>
    }

    const getSortByPriceContent = (): JSX.Element => {
        return <div className={selectedMenuStyle}>
            <CustomDropdown
                options={[ASCENDING, DESCENDING]}
                setDefaultValue={setSelectedSortPriceOption}
                defaultValue={selectedSortPriceOption}
                onSelectItem={sortByPrice}
                name={SORT_BY_PRICE} />
        </div>
    }

    return <>
        <Navbar />
        <Stack horizontal={true} gap='80'>
            <StackItem >
                <Stack gap='60'>
                    <Section name={FILTER_BY_TYPE} labelStyle={labelSectionStyle} contentValue={getFilterContent()}></Section>
                    <Section name={SORT_BY_PRICE} labelStyle={labelSectionStyle} contentValue={getSortByPriceContent()}></Section>
                    <Section name={SORT_BY_NAME} labelStyle={labelSectionStyle} contentValue={getSortByNameContent()}></Section>
                </Stack>
            </StackItem>
            <div className={dividerStyle} />
            <StackItem className={itemsContainerStyle}>
                {
                    cakes.length > 0 && cakes.map((cake: ICake, index: number) => getCard(cake, index))
                }
            </StackItem>
        </Stack >
    </>
}