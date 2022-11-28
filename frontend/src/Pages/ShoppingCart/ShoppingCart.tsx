import { Stack, StackItem } from "@fluentui/react";
import { Box, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { GroupedList } from "../../components/List/GroupedList";
import { Navbar } from "../../components/Navbar/Navbar";
import { ORDER_LIST_KEY, PERSON_KEY } from "../../Utils/constants";
import { Pages } from "../../Utils/enums";
import { getMessage } from "../../Utils/methods";
import { IPerson } from "../../Utils/Models/IPerson";
import { OrderRoutes } from "../../Utils/Routes/backEndRoutes";
import { IItem } from "../SelectedItem/SelectedCake.types";
import { addOrderButtonStyle, boxStyle, innerDiv, listStyle, outerDiv } from "./ShoppingCart.Styles";
import { IItemDTO, IOrderData, IShoppingList } from "./ShoppingCart.types";

export const ShoppingCart = (): JSX.Element => {
    const shoppingList: IShoppingList = JSON.parse(localStorage.getItem(ORDER_LIST_KEY) as string)
    const person: IPerson = JSON.parse(localStorage.getItem(PERSON_KEY) as string)
    const navigate: NavigateFunction = useNavigate()

    const mapToIItemDTO = (items: IItem[]): IItemDTO[] => {
        return items.map((order: IItem) => { return { id: order.id, amount: order.amount } })
    }

    const cakes: any[] = shoppingList?.cakes?.map((cake: IItem) => {
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

    const drinks: any[] = shoppingList?.drinks?.map((drink: IItem) => {
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
            id: parseInt(person.id?.toString()),
            cakes: mapToIItemDTO(shoppingList.cakes),
            drinks: mapToIItemDTO(shoppingList.cakes),
        };
        await axios.post(OrderRoutes.AddOrder, orderData);
        getMessage("success", "Successfully", "Your order has been placed")
        navigate(Pages.Home)
    }

    const onDeleteItems = (items: any[]): void => {
        localStorage.setItem(ORDER_LIST_KEY, JSON.stringify(items))
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

    return <Stack>
        <StackItem>
            <Navbar />
        </StackItem>
        <StackItem>
            <div className={outerDiv}>
                <div className={innerDiv}>
                    <Box className={`${listStyle} ${innerDiv}`} sx={boxStyle}>
                        <GroupedList groupByColumn={'type'} items={rows} columns={columns} onDeleteItems={onDeleteItems} />
                    </Box>
                </div>
                <Button variant="contained" className={`${addOrderButtonStyle} ${innerDiv}`} onClick={onClick} >Add Order</Button>
            </div>
        </StackItem>
    </Stack >
}