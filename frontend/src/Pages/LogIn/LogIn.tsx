import { Box, Button, CssBaseline, Grid, Paper, TextField, ThemeProvider, Typography } from "@mui/material"
import { createTheme } from '@mui/material/styles'
import axios from "axios"
import { Fragment, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { INSERT_EMAIL_MESSAGE, ERROR_MESSAGE, FAVORITE_ITEMS_LIST_KEY, FORGOT_PASSWORD_MESSAGE, LOGIN_MESSAGE, ORDER_LIST_KEY, PERSON_KEY, QUESTION_INFO_MESSAGE, SUCCESSFULLY, ERROR_EMAIL_MESSAGE } from "../../Utils/constants"
import { Pages, RoleType, SweetAlertIcon } from "../../Utils/enums"
import { getMessage } from "../../Utils/methods"
import { IRole } from "../../Utils/Models/IRole"
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
    const [email, setEmail] = useState<string>('');
    const [forgotPassword, setForgotPassword] = useState<boolean>(false)

    localStorage.setItem(ORDER_LIST_KEY, JSON.stringify(emptyShoppingCart))
    localStorage.setItem(FAVORITE_ITEMS_LIST_KEY, JSON.stringify([]))

    const onClickRegister = (): void => {
        navigate(Pages.Register);
    }

    const onClickForgotPassword = (): void => {
        setForgotPassword(true)
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

    const onForgotPassword = async (): Promise<void> => {
        if (email === '' && !email) { getMessage(SweetAlertIcon.Info, QUESTION_INFO_MESSAGE, INSERT_EMAIL_MESSAGE) }
        else {
            const role: IRole = {
                username: "",
                password: "",
                email: email,
                type: RoleType.Client
            }
            const response = await axios.post(RoleRoutes.ForgotPassword, role)
            if (response.data) {
                setForgotPassword(false)
                getMessage(SweetAlertIcon.Succes, SUCCESSFULLY, FORGOT_PASSWORD_MESSAGE)
            }
            else {
                getMessage(SweetAlertIcon.Error, ERROR_MESSAGE, ERROR_EMAIL_MESSAGE)
            }
        }
    }

    const onChange = (event: any): void => {
        const value: string = event.target.value;
        const name: string = event.target.name;
        switch (name) {
            case ("Username"):
                setUsername(value)
                break
            case ("Password"):
                setPassword(value)
                break
            case ("Email"):
                setEmail(value)
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
                                    id="username"
                                    label="Username"
                                    name="Username"
                                    autoComplete="username"
                                    autoFocus
                                />
                                <TextField onChange={onChange}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="Password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                {(forgotPassword)
                                    ? <TextField onChange={onChange}
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="Email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                    : undefined}
                                <Button onClick={(forgotPassword) ? onForgotPassword : onLogIn}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={logInButtonStyle}
                                >
                                    {(forgotPassword) ? "Send Password" : "Log In"}
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Button onClick={onClickRegister} style={buttonStyle}>Create Account</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={onClickForgotPassword} style={buttonStyle}>Forgot password</Button>
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