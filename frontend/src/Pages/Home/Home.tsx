import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { CustomCard } from "../../components/Card/CustomCard"
import { ICake } from "../../Utils/Models/ICake"

export const Home = (): JSX.Element => {
    const [cakes, setCakes] = useState<ICake[]>([])
    const navigate: NavigateFunction = useNavigate()
    const onClick = async (event: any): Promise<void> => {
        //navigate('/LogIn')
        const response = await axios.get('http://localhost:8081/Cake/getAll')
        console.log(cakes)
        setCakes(response.data)
    }
    const d = new Date(99, 11, 24);
    return <>
        <Button variant="text" onClick={onClick}>Text</Button>
        {
            cakes.length > 0 ?
                <CustomCard title={cakes[0]?.name} expirationDate={cakes[0]?.expirationDate} ingredients={cakes[0]?.ingredients}></CustomCard>
                : undefined
        }
    </>
}