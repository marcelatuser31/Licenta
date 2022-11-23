import { Stack, StackItem } from "@fluentui/react";
import { Box, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { CustomList } from "../../components/CustomList/CustomList";
import { Navbar } from "../../components/Navbar/Navbar";
import { MESSAGE_ADD_ORDER, ORDER_LIST_KEY, PERSON_KEY } from "../../Utils/constants";
import { Pages } from "../../Utils/enums";
import { getMessage } from "../../Utils/methods";
import { IPerson } from "../../Utils/Models/IPerson";
import { OrderRoutes } from "../../Utils/Routes/backEndRoutes";
import { IItem } from "../Cake/Cake.types";
import { addOrderButtonStyle, boxStyle, innerDiv, listStyle, outerDiv } from "./ShoppingCart.Styles";
import { IItemDTO, IOrderData, IShoppingList } from "./ShoppingCart.types";

export const ShoppingCart = (): JSX.Element => {
    const shoppingList: IShoppingList = JSON.parse(localStorage.getItem(ORDER_LIST_KEY) as string)
    const person: IPerson = JSON.parse(localStorage.getItem(PERSON_KEY) as string)
    const navigate: NavigateFunction = useNavigate()

    const mapToIItemDTO = (items: IItem[]): IItemDTO[] => {
        return items.map((order: IItem) => { return { id: order.cakeId, amount: order.amount } })
    }

    const rows: any = shoppingList?.cakes?.map((cake: IItem) => {
        return {
            id: cake.cakeId,
            price: cake.price,
            name: cake.name,
            cakeMessage: cake.cakeMessage,
            weight: cake.weight,
            amount: cake.amount
        }
    })

    const onClick = async (event: any): Promise<void> => {
        if (person.id === undefined)
            return

        const orderData: IOrderData = {
            id: parseInt(person.id?.toString()),
            cakes: mapToIItemDTO(shoppingList.cakes),
            drinks: mapToIItemDTO(shoppingList.cakes),
        };
        await axios.post(OrderRoutes.AddOrder, orderData);
        getMessage(MESSAGE_ADD_ORDER)
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
        { field: 'cakeMessage', headerName: 'Cake Message', width: 180, editable: true }
    ];

    return <Stack>
        <StackItem>
            <Navbar />
        </StackItem>
        <StackItem>
            <div className={outerDiv}>
                <div className={innerDiv}>
                    <Box className={`${listStyle} ${innerDiv}`} sx={boxStyle}>
                        <CustomList groupByColumn={"name"} items={rows} columns={columns} onDeleteItems={onDeleteItems} />
                    </Box>
                </div>
                <Button variant="contained" className={`${addOrderButtonStyle} ${innerDiv}`} onClick={onClick} >Add Order</Button>
            </div>
        </StackItem>
    </Stack >
}