import { ChoiceGroup, Dropdown, IChoiceGroupOption, IDropdownOption, Stack, StackItem } from "@fluentui/react"
import { styled } from "@mui/material"
import axios from "axios"
import * as React from 'react'
import { useEffect, useState } from "react"
import { customCardStyle } from "../../components/CustomCard/CustomCard.styles"
import { CustomCard } from "../../components/CustomCard/CustomCard"
import { CustomDropdown } from "../../components/CustomDropdown/CustomDropdown"
import { Navbar } from "../../components/Navbar/Navbar"
import { Section } from "../../components/Section/Section"
import { labelSectionStyle, selectedMenuStyle } from '../../Pages/Home/Home.styles'
import { ASCENDING, DESCENDING, HEADERS } from "../../Utils/constants"
import { getImageURLfromByteArray } from "../../Utils/methods"
import { ICake } from "../../Utils/Models/ICake"
import { CakeRoutes } from "../../Utils/Routes/backEndRoutes"
import { cakesContainerStyle, choiceGroupStyle } from "./Home.styles"

export const Input = styled('input')({ display: 'none' })
const getCard = (cake: ICake, index: number): JSX.Element => {
    return <div className={customCardStyle} key={index}>
        <CustomCard
            id={cake.id}
            title={cake.name}
            expirationDate={cake.expirationDate}
            ingredients={cake.ingredients}
            image={getImageURLfromByteArray(cake.image)}
            price={cake.price}
            weight={cake.weight}
        />
    </div>
}

export const Home = (): JSX.Element => {
    const [cakes, setCakes] = useState<ICake[]>([])
    const [cakeTypes, setCakeTypes] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState<string>('All');
    const [selectedSortPriceOption, setSelectedSortPriceOption] = useState<string>("");

    const sortByPrice = (): void => {
        let sortCakeList: ICake[] = []
        if (selectedSortPriceOption === ASCENDING) {
            sortCakeList = cakes.sort((a: ICake, b: ICake) => b.price - a.price)
        } else {
            sortCakeList = cakes.sort((a: ICake, b: ICake) => a.price - b.price)
        }
        setCakes(sortCakeList)
    }

    useEffect(() => {
        const getData = async (): Promise<any> => {
            const response = await axios.get(CakeRoutes.GetTypes);
            const types: string[] = response.data
            types.push('All');
            setCakeTypes(types)
        }
        getData();
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
            const response = await axios.get(CakeRoutes.GetAll)
            setCakes(response.data)
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

    const getFilterContent = (): JSX.Element => {
        return <ChoiceGroup
            onChange={onChoiceGroupChange}
            className={choiceGroupStyle}
            defaultSelectedKey="B"
            options={options}
        />
    }

    const getSortByPriceContent = (): JSX.Element => {
        return <div className={selectedMenuStyle}>
            <CustomDropdown
                options={[ASCENDING, DESCENDING]}
                setDefaultValue={setSelectedSortPriceOption}
                defaultValue={selectedSortPriceOption}
                onSelectItem={sortByPrice}
            />
        </div>
    }

    return <>
        <Navbar />
        <Stack horizontal={true} gap='80'>
            <StackItem >
                <Stack gap='80'>
                    <Section name='Filter By Type' labelStyle={labelSectionStyle} contentValue={getFilterContent()}></Section>
                    <Section name='Sort by Price' labelStyle={labelSectionStyle} contentValue={getSortByPriceContent()}></Section>
                </Stack>
            </StackItem>
            <StackItem className={cakesContainerStyle}>
                {
                    cakes.length > 0 && cakes.map((cake: ICake, index: number) => getCard(cake, index))
                }
            </StackItem>
        </Stack >
    </>
}