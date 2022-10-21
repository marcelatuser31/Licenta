import axios from "axios"
import { useEffect, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { customCardStyle } from "../../components/Card/Card.styles"
import { CustomCard } from "../../components/Card/CustomCard"
import { Header } from "../../components/Header/Header"
import { HEADERS } from "../../Utils/constants"
import { ICake } from "../../Utils/Models/ICake"
import { CakeRoutes } from "../../Utils/Routes/backEndRoutes"
import { cakesContainerStyles } from "./Home.styles"

const getCard = (cake: ICake): JSX.Element => {
    return <div className={customCardStyle} key={cake.id}>
        <CustomCard
            title={cake.name}
            expirationDate={cake.expirationDate}
            ingredients={cake.ingredients} />
    </div>
}

export const Home = (): JSX.Element => {
    const [cakes, setCakes] = useState<ICake[]>([])
    const [cakeTypes, setCakeTypes] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const navigate: NavigateFunction = useNavigate()

    useEffect(() => {
        const getData = async (): Promise<any> => {
            const response = await axios.get(CakeRoutes.GetTypes);
            setCakeTypes(response.data)
        }
        getData();
        const getCakesByType = async (): Promise<any> => {
            const response = await axios.post(CakeRoutes.GetCakesByType, cakeTypes.indexOf(selectedType), { headers: HEADERS })
            setCakes(response.data)
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

    return <>
        <Header cakeTypes={cakeTypes} setSelectedType={setSelectedType} />
        <div className={cakesContainerStyles}>
            {
                cakes.length > 0 ?
                    cakes.map((cake: ICake) => getCard(cake))
                    : undefined
            }
        </div>
    </>
}