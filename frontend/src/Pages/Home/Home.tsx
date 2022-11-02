import { ChoiceGroup, IChoiceGroupOption, Stack, StackItem } from "@fluentui/react"
import { Button, styled } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { customCardStyle } from "../../components/Card/Card.styles"
import { CustomCard } from "../../components/Card/CustomCard"
import { Navbar } from "../../components/Navbar/Navbar"
import { HEADERS, IMAGE_HEADERS } from "../../Utils/constants"
import { getImageURLfromByteArray, onUploadPhoto } from "../../Utils/methods"
import { ICake } from "../../Utils/Models/ICake"
import { CakeRoutes } from "../../Utils/Routes/backEndRoutes"
import { cakesContainerStyles, choiceGroupStyle } from "./Home.styles"

export const Input = styled('input')({ display: 'none' })
const getCard = (cake: ICake): JSX.Element => {
    return <div className={customCardStyle} key={cake.id}>
        <CustomCard
            cakeId={cake.id}
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
    const navigate: NavigateFunction = useNavigate()

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
            console.log(response.data)
            setCakes(response.data)
        }
        getData()
    }, [])

    return <>
        <Navbar />
        <Stack horizontal={true} gap='80'>
            <StackItem>
                <ChoiceGroup
                    onChange={onChoiceGroupChange}
                    styles={choiceGroupStyle}
                    defaultSelectedKey="B"
                    options={options}
                />
            </StackItem>
            <StackItem className={cakesContainerStyles}>
                {
                    cakes.length > 0 ?
                        cakes.map((cake: ICake) => getCard(cake))
                        : undefined
                }
            </StackItem>

        </Stack>
    </>
}