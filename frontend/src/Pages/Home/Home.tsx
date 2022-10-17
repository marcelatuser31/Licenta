import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { customCardStyle } from "../../components/Card/Card.styles"
import { CustomCard } from "../../components/Card/CustomCard"
import { Header } from "../../components/Header/Header"
import { Layout } from "../../components/Layout/Layout"
import { ICake } from "../../Utils/Models/ICake"
import { cakesContainerStyles } from "./Home.styles"


const getCard = (cake: ICake): JSX.Element => {
    return <div className={customCardStyle}>
        <CustomCard
            title={cake.name}
            expirationDate={cake.expirationDate}
            ingredients={cake.ingredients} />
    </div>
}

export const Home = (): JSX.Element => {
    const [cakes, setCakes] = useState<ICake[]>([])
    const navigate: NavigateFunction = useNavigate()

    useEffect(() => {
        const getData = async (): Promise<void> => {
            const response = await axios.get('http://localhost:8081/Cake/getAll')
            console.log(cakes)
            setCakes(response.data)
        }
        getData()

    }, [])

    return <>
        <Header />
        <div className={cakesContainerStyles}>
            {
                cakes.length > 0 ?
                    cakes.map((cake: ICake) => getCard(cake))
                    : undefined
            }
        </div>
    </>
}