import { Stack, StackItem } from "@fluentui/react"
import { Button } from "@mui/material"
import { useLocation } from "react-router-dom"
import { Navbar } from "../../components/Navbar/Navbar"
import { Section } from "../../components/Section/Section"
import { ADD_TO_CART_MESSAGE, DRINK, ORDER_LIST_KEY, SUCCESSFULLY } from "../../Utils/constants"
import { IShoppingList } from "../ShoppingCart/ShoppingCart.types"
import { addToCartStyle, imageStyle, titleStyle } from "./SelectedCake.styles"
import { IItem } from "./SelectedCake.types"
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { getMessage } from "../../Utils/methods"
import { SweetAlertIcon } from "../../Utils/enums"
import { useState } from "react"
import { IDrink } from "../../Utils/Models/IDrink"
import axios from "axios"
import { DrinkRoutes } from "../../Utils/Routes/backEndRoutes"
import { CustomDialog } from "../../components/CustomDialog/CustomDialog"

export const defaultItem: IDrink = {
    id: 0,
    name: "",
    weight: 0,
    price: 0,
    amount: 0
}

export const SelectedDrink = (): JSX.Element => {
    const location = useLocation()
    const [item, setItem] = useState<IDrink>(defaultItem);
    const dialogLabels: string[] = ['Name', 'Price', 'Weight', 'Amount']
    const onAddToCart = (event: any): void => {
        const shoppingList: IShoppingList = JSON.parse(localStorage.getItem(ORDER_LIST_KEY) as string)
        const drink: IItem | undefined = shoppingList.drinks.find((a: IItem) => a.id === location.state.id)
        if (drink === undefined) {
            const newDrink: IItem = {
                id: location.state.id,
                name: location.state.title,
                price: location.state.price,
                weight: location.state.weight,
                amount: 1,
                type: DRINK
            }
            shoppingList.drinks.push(newDrink)
            localStorage.setItem(ORDER_LIST_KEY, JSON.stringify(shoppingList))
        }
        else {
            shoppingList.drinks.forEach((drink: IItem) => {
                if (drink.id === location.state.id) {
                    drink.amount = drink.amount + 1
                }
            })
            localStorage.setItem(ORDER_LIST_KEY, JSON.stringify(shoppingList))
        }
        getMessage(SweetAlertIcon.Succes, SUCCESSFULLY, ADD_TO_CART_MESSAGE)
    }

    const onSave = async (event: any): Promise<void> => {
        const response = await axios.post(DrinkRoutes.AddDrink, item);
    }

    const onChangeDialog = (event: any): void => {
        const value: any = event.target.value;
        const name: string = event.target.name;
        switch (name) {
            case 'Name':
                setItem({ ...item, name: value })
                break
            case "Price":
                setItem({ ...item, price: value })
                break
            case "Amount":
                setItem({ ...item, amount: value })
                break
            case "Weight":
                setItem({ ...item, weight: value })
                break
        }
    }

    return <div>
        <Navbar />
        <Stack horizontal={true} gap='80'>
            <StackItem>
                <img width={600} height={600} alt={'Not found'} src={'https://baztimisoara.ro/wp-content/uploads/2020/05/coco_cola_330ml.jpg'} className={imageStyle} />
            </StackItem>
            <StackItem>
                <Stack gap='30'>
                    <StackItem className={titleStyle}>
                        {location.state.title}
                    </StackItem>
                    <Section name={"Price:"} contentValue={location.state.price + ' RON'} gap={10}></Section>
                    <Section name={"Weight:"} contentValue={location.state.weight + ' ml'} gap={10}></Section>
                    <StackItem>
                        <Button variant="contained" className={addToCartStyle} endIcon={<ShoppingCartCheckoutIcon />} onClick={onAddToCart} >Add to cart</Button>
                    </StackItem>
                    <StackItem>
                        <CustomDialog labels={dialogLabels} buttonTitle={"ADD DRINK"} onChange={onChangeDialog} onSave={onSave} />
                    </StackItem>
                </Stack>
            </StackItem>
        </Stack>
    </div>
}