import { ChoiceGroup, IChoiceGroupOption, Stack, StackItem } from "@fluentui/react"
import { Button, TextField, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { Navbar } from "../../components/Navbar/Navbar"
import { IIngredient } from "../../Utils/Models/IIngredient"
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { addToCartStyle, choiceGroupStyle, imageStyle, labelStyle, textFieldStyle, titleStyle, valueStyle } from "./SelectedCake.styles"
import { useState } from "react"
import { IItem } from "./SelectedCake.types"
import { ADD_CAKE, ADD_TO_CART_MESSAGE, CAKE, OK, ORDER_LIST_KEY, PERSON_KEY, SUCCESSFULLY } from "../../Utils/constants"
import { IPerson } from "../../Utils/Models/IPerson"
import { ItemField, RoleType, SweetAlertIcon } from "../../Utils/enums"
import { Input } from "../Cakes/Cakes"
import { getMessage, onUploadPhoto } from "../../Utils/methods"
import { Section } from "../../components/Section/Section"
import { IShoppingList } from "../ShoppingCart/ShoppingCart.types"
import { CustomDialog } from "../../components/CustomDialog/CustomDialog"
import { ICake } from "../../Utils/Models/ICake"
import axios from "axios"
import { CakeRoutes } from "../../Utils/Routes/backEndRoutes"

export const defaultItem: ICake = {
    id: 0,
    name: "",
    price: 0,
    weight: 0,
    amount: 0,
    ingredients: [],
    expirationDate: undefined,
    image: ''
}

const options: IChoiceGroupOption[] = [
    { key: 'A', text: '0.5kg', styles: { root: { marginLeft: 0 } } },
    { key: 'B', text: '1kg', styles: { root: { marginLeft: 20 } } },
    { key: 'C', text: '1.5kg', styles: { root: { marginLeft: 20 } } },
    { key: 'D', text: '2kg', styles: { root: { marginLeft: 20 } } },
];

export const SelectedCake = (): JSX.Element => {
    const [cakeMessage, setCakeMessage] = useState<string>('');
    const [selectedWeight, setSelectedWeight] = useState<number>(1);
    const [item, setItem] = useState<ICake>(defaultItem);
    const location = useLocation()
    const person: IPerson = JSON.parse(localStorage.getItem(PERSON_KEY) as string)
    const cakeField: string[] = [ItemField.Name, ItemField.Price, ItemField.Weight, ItemField.Amount, ItemField.Ingredients]

    const onCheckBoxGroupChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, option?: IChoiceGroupOption | undefined): void => {
        setSelectedWeight(Number(option?.text.substring(0, option.text.length - 2)))
    }

    const onAddToCart = (event: any): void => {
        const shoppingList: IShoppingList = JSON.parse(localStorage.getItem(ORDER_LIST_KEY) as string)

        const cake: IItem | undefined = shoppingList.cakes.find((a: IItem) => a.id === location.state.id)
        if (cake === undefined) {
            const newCake: IItem = {
                id: location.state.id,
                name: location.state.title,
                price: location.state.price * selectedWeight,
                cakeMessage: cakeMessage,
                weight: selectedWeight,
                amount: 1,
                type: CAKE
            }
            shoppingList.cakes.push(newCake)
            localStorage.setItem(ORDER_LIST_KEY, JSON.stringify(shoppingList))
        }
        else {
            shoppingList.cakes.forEach((cake: IItem) => {
                if (cake.id === location.state.id) {
                    cake.amount = cake.amount + 1
                }
            })
            localStorage.setItem(ORDER_LIST_KEY, JSON.stringify(shoppingList))
        }
        getMessage(SweetAlertIcon.Succes, SUCCESSFULLY, ADD_TO_CART_MESSAGE)
    }

    const onSave = async (event: any): Promise<void> => {
        const response = await axios.post(CakeRoutes.AddCake, item);
    }

    const onChangeDialog = (event: any): void => {
        const value: any = event.target.value;
        const name: string = event.target.name;
        switch (name) {
            case ItemField.Name:
                setItem({ ...item, name: value })
                break
            case ItemField.Price:
                setItem({ ...item, price: value })
                break
            case ItemField.Amount:
                setItem({ ...item, amount: value })
                break
            case ItemField.Weight:
                setItem({ ...item, weight: value })
                break
        }
    }

    const onChange = (event: any): void => {
        const value: string = event.target.value;
        setCakeMessage(value);
    }

    const getIngredientsContent = (): JSX.Element => {
        return <Stack horizontal={true} gap='10'>
            {location.state.ingredients?.map((ingredient: IIngredient) =>
                <Typography>
                    {ingredient.name}
                </Typography>)}
        </Stack>
    }

    const getWeightContent = (): JSX.Element => {
        return <ChoiceGroup onChange={onCheckBoxGroupChange}
            styles={choiceGroupStyle}
            defaultSelectedKey="B"
            options={options}
        />
    }

    const getMessageContent = (): JSX.Element => {
        return <TextField className={`${valueStyle} ${textFieldStyle}`}
            onChange={onChange}
            style={{ borderColor: "red", width: "25vw" }}
            margin="normal"
            required
            fullWidth
            id="CakeMessage"
            name="CakeMessage"
            autoFocus
        />
    }

    const getUploadContent = (): JSX.Element => {
        return <Button variant="contained" component="label">
            Upload
            <Input accept='image/*' id='contained-button-file' multiple type='file' onChange={(event: any) => onUploadPhoto(event, location.state.id, CakeRoutes.AddImage)} />
        </Button>
    }

    return <>
        <Navbar />
        <Stack horizontal={true} gap='80' >
            <StackItem>
                <img width={600} height={600} alt={'Not found'} src={location.state.image} className={imageStyle} />
            </StackItem>
            <StackItem>
                <Stack gap='30'>
                    <StackItem className={titleStyle}>
                        {location.state.title}
                    </StackItem>
                    <Section name={"Price:"} contentValue={(location.state.price * selectedWeight).toString() + ' RON'} gap={10} />
                    <Section name={"Weight:"} contentValue={getWeightContent()} gap={10} />
                    <Section name={"Ingredients:"} contentValue={getIngredientsContent()} />
                    <Section name={"Cake Message:"} contentValue={getMessageContent()} gap={10} />
                    {person.role.type == RoleType.Admin
                        ? <Section name={"Upload Photo:"} contentValue={getUploadContent()} gap={10} />
                        : <StackItem align="center">
                            <Button variant="contained" className={addToCartStyle} endIcon={<ShoppingCartCheckoutIcon />} onClick={onAddToCart} >Add to cart</Button>
                        </StackItem>}
                    <StackItem>
                        <CustomDialog labels={cakeField} buttonTitle={ADD_CAKE} onChange={onChangeDialog} onSave={onSave} />
                    </StackItem>
                </Stack>
            </StackItem>
        </Stack >
    </>
}