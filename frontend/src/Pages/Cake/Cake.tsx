import { ChoiceGroup, IChoiceGroupOption, Stack, StackItem } from "@fluentui/react"
import { Button, TextField, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { Header } from "../../components/Header/Header"
import { IIngredient } from "../../Utils/Models/IIngredient"
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { imageStyle, labelStyle, textFieldStyle, title, valueStyle } from "./Cake.styles"
import { useState } from "react"
import { ICakeOrder } from "./Cake.types"

export const Cake = (): JSX.Element => {
    const [cakeMessage, setCakeMessage] = useState<string>('');
    const location = useLocation()
    const options: IChoiceGroupOption[] = [
        { key: 'A', text: '0.5kg', styles: { root: { marginLeft: 0 } } },
        { key: 'B', text: '1kg', styles: { root: { marginLeft: 20 } } },
        { key: 'C', text: '1.5kg', styles: { root: { marginLeft: 20 } } },
        { key: 'D', text: '2kg', styles: { root: { marginLeft: 20 } } },
    ];

    const onClick = (event: any): void => {
        const newCake: ICakeOrder = {
            cakeId: location.state.cakeId,
            name: location.state.title,
            price: location.state.price,
            cakeMessage: cakeMessage,
            weight: location.state.weight
        }
        const newCakeList: ICakeOrder[] = JSON.parse(localStorage.getItem('order') as string)
        newCakeList.push(newCake)
        localStorage.setItem('order', JSON.stringify(newCakeList))
    }

    const onChange = (event: any): void => {
        const value: string = event.target.value;
        setCakeMessage(value);
    }

    return <>
        <Header cakeTypes={[]} setSelectedType={function (state: string): void {
            throw new Error("Function not implemented.")
        }} />
        <Stack horizontal={true} gap='80' >
            <StackItem>
                <img width={600} height={600} alt={'Not found'} src={location.state.image} className={imageStyle} />
            </StackItem>
            <StackItem>
                <Stack gap='50'>
                    <StackItem className={title}>
                        {location.state.title}
                    </StackItem>
                    <StackItem >
                        <Stack gap='10'>
                            <StackItem className={labelStyle}>Price:</StackItem>
                            <StackItem className={valueStyle}>{location.state.price} RON </StackItem>
                        </Stack>
                    </StackItem>
                    <StackItem>
                        <Stack gap='10'>
                            <StackItem className={labelStyle}>Weight:</StackItem>
                            <StackItem className={valueStyle}>
                                <ChoiceGroup
                                    styles={{ flexContainer: { display: "flex" } }}
                                    defaultSelectedKey="B"
                                    options={options}
                                />
                            </StackItem>
                        </Stack>
                    </StackItem>
                    <StackItem>
                        <Stack >
                            <StackItem className={labelStyle}>Ingredients:</StackItem>
                            <StackItem className={valueStyle}>
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
                            <StackItem className={labelStyle}>Cake Message:
                            </StackItem>
                            <StackItem>
                                <TextField className={`${valueStyle} ${textFieldStyle}`}
                                    onChange={onChange}
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
                        <Button variant="contained" className={valueStyle} endIcon={<ShoppingCartCheckoutIcon />} onClick={onClick} >Add to cart</Button>
                    </StackItem>
                </Stack>
            </StackItem>
        </Stack >
    </>
}