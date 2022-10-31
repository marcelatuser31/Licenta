import { Button, styled } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { customCardStyle } from "../../components/Card/Card.styles"
import { CustomCard } from "../../components/Card/CustomCard"
import { Header } from "../../components/Header/Header"
import { HEADERS, IMAGE_HEADERS } from "../../Utils/constants"
import { getImageURLfromByteArray } from "../../Utils/methods"
import { ICake } from "../../Utils/Models/ICake"
import { CakeRoutes } from "../../Utils/Routes/backEndRoutes"
import { cakesContainerStyles } from "./Home.styles"

const Input = styled('input')({ display: 'none' })
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

    useEffect(() => {
        const getData = async (): Promise<any> => {
            const response = await axios.get(CakeRoutes.GetTypes);
            const types: string[] = response.data
            types.unshift('All');
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

    const onChange = (event: any): void => {
        const formdata: FormData = new FormData()
        formdata.append('image', event.target.files[0])
        formdata.append('cakeId', cakes[0].id.toString())
        const getData = async (): Promise<void> => {
            const response = await axios.post(CakeRoutes.AddImage, formdata, { headers: IMAGE_HEADERS })
        }
        getData()
    }

    return <>
        <Header cakeTypes={cakeTypes} setSelectedType={setSelectedType} />
        <div className={cakesContainerStyles}>
            {
                cakes.length > 0 ?
                    cakes.map((cake: ICake) => getCard(cake))
                    : undefined
            }
        </div>
        <Button variant="contained" component="label">
            Upload
            <Input accept='image/*' id='contained-button-file' multiple type='file' onChange={onChange} />
        </Button>
    </>
}