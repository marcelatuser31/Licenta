import { Button } from "@mui/material"
import axios from "axios"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { ICake } from "../../Utils/Models/ICake"

export const Home=():JSX.Element=>{
    const navigate:NavigateFunction=useNavigate()
    const onClick=async(event:any):Promise<void>=>{
        //navigate('/LogIn')
        const cakes:ICake[]=await axios.get('http://localhost:8081/Cake/getAll')
        console.log(cakes)
    }

    return <><Button variant="text" onClick={onClick}>Text</Button></>
}