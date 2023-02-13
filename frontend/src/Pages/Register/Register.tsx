import { ThemeProvider } from "@emotion/react"
import { Box, Button, createTheme, CssBaseline, Grid, Paper, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { ERROR_MESSAGE } from "../../Utils/constants"
import { Pages, RoleType, SweetAlertIcon } from "../../Utils/enums"
import { getMessage } from "../../Utils/methods"
import { IPerson } from "../../Utils/Models/IPerson"
import { PersonRoutes } from "../../Utils/Routes/backEndRoutes"
import { backgroundStyle, signUpBoxStyle, signUpButtonStyle, signUpLabelStyle, textfieldBoxStyle } from "./Register.style"

const registerFields: string[] = ["Name", "Address", "Phone", "Email", "Username", "Password"];
const defaultPerson: IPerson = {
    name: "",
    address: "",
    phone: "",
    role: {
        username: "",
        email: "",
        password: "",
        type: RoleType.Client
    },
    isActive: false
}

export const Register = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()
    const [person, setPerson] = useState<IPerson>(defaultPerson);

    const getTextField = (name: string): JSX.Element => {
        return <Grid item xs={12} key={name}>
            <TextField
                onChange={onChange}
                required
                fullWidth
                id={name}
                label={name}
                name={name}
                autoComplete={name}
            />
        </Grid>
    }

    const onClick = async (): Promise<void> => {
        if ((person.name === "")
            || (person.address === "")
            || (person.phone === "")
            || (person.role.username === "")
            || (person.role.password === "")
            || (person.role.email == "")) {
            getMessage(SweetAlertIcon.Error, ERROR_MESSAGE, "All fields requierd")
        }
        else {
            const response = await axios.post(PersonRoutes.Register, person);

            if (response.status == 200) {
                navigate(Pages.LogIn);
            }
        }
    }

    const onChange = (event: any): void => {
        const value: string = event.target.value;
        const name: string = event.target.name;
        switch (name) {
            case "Name":
                setPerson({ ...person, name: value })
                break
            case "Address":
                setPerson({ ...person, address: value })
                break
            case "Phone":
                setPerson({ ...person, phone: value })
                break
            case "Username":
                setPerson({ ...person, role: { ...person.role, username: value } })
                break;
            case "Password":
                setPerson({ ...person, role: { ...person.role, password: value } })
                break
            case "Email":
                setPerson({ ...person, role: { ...person.role, email: value } })
                break
        }
    }

    return <>
        <ThemeProvider theme={createTheme()}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={backgroundStyle}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={signUpBoxStyle}
                    >
                        <Typography component="h1" variant="h5" sx={signUpLabelStyle}>
                            Sign up
                        </Typography>
                        <Box sx={textfieldBoxStyle}>
                            <Grid container spacing={2}>
                                {registerFields.map((field: string) => getTextField(field))}
                            </Grid>
                            <Button
                                onClick={onClick} type="submit" fullWidth variant="contained" sx={signUpButtonStyle}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider></>
}