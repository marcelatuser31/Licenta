import { Box, Button, CssBaseline, Grid, Paper, TextField, ThemeProvider, Typography } from "@mui/material"
import { createTheme } from '@mui/material/styles'
import axios from "axios"
import { Fragment, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { ERROR_MESSAGE, FAVORITE_ITEMS_LIST_KEY, LOGIN_MESSAGE, ORDER_LIST_KEY, PERSON_KEY } from "../../Utils/constants"
import { Pages, SweetAlertIcon } from "../../Utils/enums"
import { getMessage } from "../../Utils/methods"
import { RoleRoutes } from "../../Utils/Routes/backEndRoutes"
import { logInBoxStyle } from "../Register/Register.style"
import { IShoppingList } from "../ShoppingCart/ShoppingCart.types"
import { backgroundStyle, buttonStyle, logInButtonStyle, logInLabelStyle, textFieldBoxStyle } from "./LogIn.styles"
import { ILogIn } from "./LogIn.types"

export const emptyShoppingCart: IShoppingList = { cakes: [], drinks: [] };
export const LogIn = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    localStorage.setItem(ORDER_LIST_KEY, JSON.stringify(emptyShoppingCart))
    localStorage.setItem(FAVORITE_ITEMS_LIST_KEY, JSON.stringify([]))

    const onClickRegister = (): void => {
        navigate(Pages.Register);
    }

    const onLogIn = async (): Promise<void> => {
        const loginData: ILogIn = {
            username: username,
            password: password
        };

        const response = await axios.post(RoleRoutes.LogIn, loginData);
        localStorage.setItem(PERSON_KEY, JSON.stringify(response.data))
        if (response.data != null && response.data != "") {
            navigate(Pages.Home);
        }
        else {
            getMessage(SweetAlertIcon.Error, ERROR_MESSAGE, LOGIN_MESSAGE)
        }
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

    return <>
        <Fragment>
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
                            sx={logInBoxStyle}
                        >
                            <Typography component="h1" variant="h5" sx={logInLabelStyle}>
                                Log In
                            </Typography>
                            <Box style={textFieldBoxStyle}>
                                <TextField onChange={onChange}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Username"
                                    name="Username"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField onChange={onChange}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <Button onClick={onLogIn}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={logInButtonStyle}
                                >
                                    Log In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Button onClick={onClickRegister} style={buttonStyle}>Create Account</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button style={buttonStyle}>Forgot password</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </Fragment>
    </>
}