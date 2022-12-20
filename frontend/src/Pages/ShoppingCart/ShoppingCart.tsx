import { Stack, StackItem } from "@fluentui/react";
import { Box, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { GroupedList } from "../../components/List/GroupedList";
import { Navbar } from "../../components/Navbar/Navbar";
import { Section } from "../../components/Section/Section";
import { ADD_ORDER_MESSAGE, CAKE, DRINK, ORDER_LIST_KEY, PERSON_KEY, SUCCESSFULLY } from "../../Utils/constants";
import { Pages, SweetAlertIcon } from "../../Utils/enums";
import { getMessage, reloadPage } from "../../Utils/methods";
import { IPerson } from "../../Utils/Models/IPerson";
import { OrderRoutes } from "../../Utils/Routes/backEndRoutes";
import { emptyShoppingCart } from "../LogIn/LogIn";
import { IItem } from "../SelectedItem/SelectedCake.types";
import { addOrderButtonStyle, boxStyle, innerDiv, listStyle, outerDiv } from "./ShoppingCart.Styles";
import { IItemDTO, IOrderData, IShoppingList } from "./ShoppingCart.types";

export const ShoppingCart = (): JSX.Element => {
    const shoppingList: IShoppingList = JSON.parse(localStorage.getItem(ORDER_LIST_KEY) as string)
    const person: IPerson = JSON.parse(localStorage.getItem(PERSON_KEY) as string)
    const navigate: NavigateFunction = useNavigate()

    const mapToIItemDTO = (items: IItem[]): IItemDTO[] => {
        return items.map((order: IItem) => { return { id: order.id, amount: order.amount, price: order.price } })
    }

    const cakes: IItem[] = shoppingList?.cakes?.map((cake: IItem) => {
        return {
            id: cake.id,
            price: cake.price,
            name: cake.name,
            cakeMessage: cake.cakeMessage,
            weight: cake.weight,
            amount: cake.amount,
            type: cake.type
        }
    })

    const drinks: IItem[] = shoppingList?.drinks?.map((drink: IItem) => {
        return {
            id: drink.id,
            price: drink.price,
            name: drink.name,
            weight: drink.weight,
            amount: drink.amount,
            type: drink.type
        }
    })

    const rows: any = [...cakes, ...drinks]

    const onClick = async (event: any): Promise<void> => {
        if (person.id === undefined)
            return

        const orderData: IOrderData = {
            id: person.id,
            cakes: mapToIItemDTO(shoppingList.cakes),
            drinks: mapToIItemDTO(shoppingList.drinks),
        };
        await axios.post(OrderRoutes.AddOrder, orderData);
        getMessage(SweetAlertIcon.Succes, SUCCESSFULLY, ADD_ORDER_MESSAGE)
        navigate(Pages.Home)
        localStorage.setItem(ORDER_LIST_KEY, JSON.stringify(emptyShoppingCart))
    }

    const deletedItems = (items: IItem[]): void => {
        let newCakes: IItem[] = shoppingList.cakes
        let newDrinks: IItem[] = shoppingList.drinks
        items.forEach((item: IItem) => {
            if (item.type === DRINK) {
                newDrinks = newDrinks.filter((drink: IItem) => item.id !== drink.id)
            }
            else {
                newCakes = newCakes.filter((cake: IItem) => item.id !== cake.id)
            }
        })
        localStorage.setItem(ORDER_LIST_KEY, JSON.stringify({ cakes: newCakes, drinks: newDrinks }))
        reloadPage()
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name', width: 150, },
        { field: 'price', headerName: 'Price', type: 'number', width: 110 },
        { field: 'weight', headerName: 'Weight', width: 150, type: 'number' },
        { field: 'amount', headerName: 'Amount', type: 'number' },
        { field: 'cakeMessage', headerName: 'Cake Message', width: 180, editable: true },
        { field: 'type', headerName: 'Type' }
    ];

    const cakesPrice: number = cakes.reduce((sum: number, cake: any) => sum = sum + cake.price * cake.amount, 0)
    const drinksPrice: number = drinks.reduce((sum: number, drink: any) => sum = sum + drink.price * drink.amount, 0)
    const totalPrice: number = cakesPrice + drinksPrice

    return <Stack>
        <StackItem>
            <Navbar />
        </StackItem>
        <StackItem>
            <div className={outerDiv}>
                <Box className={`${listStyle} ${innerDiv}`} sx={boxStyle}>
                    <GroupedList groupByColumn={'type'} items={rows} columns={columns} onDeleteItems={deletedItems} width={1200} />
                    <Stack horizontal={true} >
                        <Section name={"TOTAL:"} contentValue={totalPrice + ' RON'} isHorizontal={true} gap={-20}></Section>
                        <StackItem >
                            <Button variant="contained" className={addOrderButtonStyle} onClick={onClick} >Add Order</Button>
                        </StackItem>
                    </Stack>
                </Box>
            </div>
        </StackItem>
    </Stack >
}