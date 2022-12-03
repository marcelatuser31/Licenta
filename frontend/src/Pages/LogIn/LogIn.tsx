import { Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Paper, TextField, ThemeProvider, Typography } from "@mui/material"
import { createTheme } from '@mui/material/styles'
import axios from "axios"
import { Fragment, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { CANCEL, ERROR_MESSAGE, FAVORITE_ITEMS_LIST_KEY, LOGIN_MESSAGE, OK, ORDER_LIST_KEY, PERSON_KEY } from "../../Utils/constants"
import { Pages, SweetAlertIcon } from "../../Utils/enums"
import { getMessage } from "../../Utils/methods"
import { RoleRoutes } from "../../Utils/Routes/backEndRoutes"
import { IShoppingList } from "../ShoppingCart/ShoppingCart.types"
import { ILogIn } from "./LogIn.types"

const orderList: IShoppingList = { cakes: [], drinks: [] };
export const LogIn = (): JSX.Element => {
    const navigate: NavigateFunction = useNavigate()
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    localStorage.setItem(ORDER_LIST_KEY, JSON.stringify(orderList))
    localStorage.setItem(FAVORITE_ITEMS_LIST_KEY, JSON.stringify([]))

    const onClickRegister = (event: any): void => {
        navigate(Pages.Register);
    }

    const onClick = async (event: any): Promise<void> => {
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
            getMessage(SweetAlertIcon.Error, ERROR_MESSAGE, LOGIN_MESSAGE, false, undefined, true, CANCEL)
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
                        sx={{
                            backgroundImage: 'url(https://media.bakingo.com/sq-snicker-chocolate-cake0028choc-AA.jpg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Log In
                            </Typography>
                            <Box>
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
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button onClick={onClick}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Log In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Button onClick={onClickRegister}>Create Account</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button>Forgot password</Button>
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