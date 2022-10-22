import { ChoiceGroup, IChoiceGroupOption, Stack, StackItem } from "@fluentui/react"
import { Button, TextField, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { Header } from "../../components/Header/Header"
import { IIngredient } from "../../Utils/Models/IIngredient"
import { image, price1, price2, textField, title } from "./Cake.styles"
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

export const Cake = (): JSX.Element => {
    const location = useLocation()
    const options: IChoiceGroupOption[] = [
        { key: 'A', text: '0.5kg', styles: { root: { marginLeft: 0 } } },
        { key: 'B', text: '1kg', styles: { root: { marginLeft: 20 } } },
        { key: 'C', text: '1.5kg', styles: { root: { marginLeft: 20 } } },
        { key: 'D', text: '2kg', styles: { root: { marginLeft: 20 } } },
    ];

    return <>
        <Header cakeTypes={[]} setSelectedType={function (state: string): void {
            throw new Error("Function not implemented.")
        }} />
        <Stack horizontal={true} gap='80' >
            <StackItem>
                <img width={600} height={600} alt={'Not found'} src={location.state.image} className={image} />
            </StackItem>
            <StackItem>
                <Stack gap='50'>
                    <StackItem className={title}>
                        {location.state.title}
                    </StackItem>
                    <StackItem >
                        <Stack gap='10'>
                            <StackItem className={price2}>Price:</StackItem>
                            <StackItem className={price1}>{location.state.price} RON </StackItem>
                        </Stack>
                    </StackItem>
                    <StackItem>
                        <Stack gap='10'>
                            <StackItem className={price2}>Weight:</StackItem>
                            <StackItem className={price1}>
                                <ChoiceGroup
                                    styles={{ flexContainer: { display: "flex" } }}
                                    // This is usually what you should do
                                    // label="Normal label"
                                    defaultSelectedKey="B"
                                    options={options}
                                />
                            </StackItem>
                        </Stack>
                    </StackItem>
                    <StackItem>
                        <Stack >
                            <StackItem className={price2}>Ingredients:</StackItem>
                            <StackItem className={price1}>
                                <Stack horizontal={true} gap='10'>
                                    {location.state.ingredients?.map((ingredient: IIngredient) =>
                                        <Typography>
                                            {ingredient.name}
                                        </Typography>)}
                                </Stack>
                            </StackItem>
                        </Stack>
                    </StackItem>
                    <StackItem>
                        <Stack>
                            <StackItem className={price2}>Cake Message:
                            </StackItem>
                            <StackItem>
                                <TextField className={`${price1} ${textField}`}
                                    style={{ borderColor: "red", width: "25vw" }}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="CakeMessage"
                                    name="CakeMessage"
                                    autoFocus
                                />
                            </StackItem>
                        </Stack>
                    </StackItem>
                    <StackItem align="center">
                        <Button variant="contained" className={price1} endIcon={<ShoppingCartCheckoutIcon />}>Add to cart</Button>
                    </StackItem>
                </Stack>
            </StackItem>
        </Stack >
    </>
}