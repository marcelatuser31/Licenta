import { Button, TextField } from "@mui/material"
import { NavigateFunction, useNavigate } from "react-router-dom"

export const LogIn=():JSX.Element=>{
    const navigate:NavigateFunction=useNavigate()

    const onClick=(event:any):void=>{
        navigate('/Home')
    }

    const onChange=(event:any):void=>{
        console.log(event)
        const value:string=event.target.value;
        const name:string=event.target.name;
        console.log(value)
        console.log(name)
    } 

    return <>
        <Button variant="text" onClick={onClick}>Text</Button>
        <TextField onChange={onChange} name='Name'/>
    </>
}