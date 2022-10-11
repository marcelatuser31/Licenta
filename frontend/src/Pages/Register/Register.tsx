import { ThemeProvider } from "@emotion/react"
import { Avatar, Box, Button, Checkbox, Container, createTheme, CssBaseline, FormControlLabel, Grid, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { Pages, RoleType } from "../../Utils/enums"
import { IPerson } from "../../Utils/Models/IPerson"
import { PersonRoutes } from "../../Utils/Routes/backEndRoutes"

const registerFields: string[] = ["name", "address", "phone", "email", "username", "password"];
const defaultPErson: IPerson = {
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
    const [person, setPerson] = useState<IPerson>(defaultPErson);

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

    const onClick = async (event: any): Promise<void> => {
        const response = await axios.post(PersonRoutes.Register, person);

        if (response.status == 200) {
            navigate(Pages.LogIn);
        }
    }

    const onChange = (event: any): void => {
        const value: string = event.target.value;
        const name: string = event.target.name;
        switch (name) {
            case "name":
                setPerson({ ...person, name: value })
                break
            case "address":
                setPerson({ ...person, address: value })
                break
            case "phone":
                setPerson({ ...person, phone: value })
                break
            case "username":
                setPerson({ ...person, role: { ...person.role, username: value } })
                break;
            case "password":
                setPerson({ ...person, role: { ...person.role, password: value } })
                break
            case "email":
                setPerson({ ...person, role: { ...person.role, email: value } })
                break

        }
    }

    return <>
        <ThemeProvider theme={createTheme()}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            {registerFields.map((field: string) => getTextField(field))}
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            onClick={onClick} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider></>
}