import { Button, TextField } from "@mui/material"
import axios from "axios"
import React, { Fragment, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { RoleRoutes } from "../../Utils/Routes/backEndRoutes"
import { ILogIn } from "./LogIn.types"

export const LogIn = (): JSX.Element => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate: NavigateFunction = useNavigate()

    const onClick = async (event: any): Promise<void> => {
        const loginData: ILogIn = {
            username: username,
            password: password
        };

        const response = await axios.post(RoleRoutes.LogIn, loginData);
        console.log(response.data)
    }

    const onChange = (event: any): void => {

        const value: string = event.target.value;
        const name: string = event.target.name;
        if (name == 'Username') {
            setUsername(value)
        } else {
            setPassword(value)
        }
    }

    return <Fragment>
        <TextField id="outlined-basic" label="Username" variant="outlined" onChange={onChange} name='Username' />
        <br></br>
        <TextField id="outlined-basic" label="Password" variant="outlined" onChange={onChange} name='Password' />
        <br></br>
        <Button variant="text" onClick={onClick}>LOGIN</Button>
    </Fragment>
}