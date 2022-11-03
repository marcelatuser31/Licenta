import { Stack, StackItem } from "@fluentui/react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axios from "axios";
import { Navbar } from "../../components/Navbar/Navbar";
import { ORDER_LIST_KEY, PERSON_KEY } from "../../Utils/constants";
import { IPerson } from "../../Utils/Models/IPerson";
import { OrderRoutes } from "../../Utils/Routes/backEndRoutes";
import { valueStyle } from "../Cake/Cake.styles";
import { ICakeOrder } from "../Cake/Cake.types";
import { boxStyle, innerDiv, listStyle, outerDiv } from "./ShoppingCart.Styles";
import { ICakeDTO, IOrderData } from "./ShoppingCart.types";

export const ShoppingCart = (): JSX.Element => {
    const newCakeList: ICakeOrder[] = JSON.parse(localStorage.getItem(ORDER_LIST_KEY) as string)
    const person: IPerson = JSON.parse(localStorage.getItem(PERSON_KEY) as string)

    const cakeDTO: ICakeDTO[] = newCakeList.map((cake: ICakeOrder) => {
        return {
            id: cake.cakeId,
            amount: 1
        }
    })

    const rows: any = newCakeList.map((cake: ICakeOrder) => {
        return {
            id: cake.cakeId,
            price: cake.price,
            name: cake.name,
            cakeMessage: cake.cakeMessage,
            weight: cake.weight
        }
    })

    const onClick = async (event: any): Promise<void> => {
        if (person.id === undefined)
            return

        const orderData: IOrderData = {
            id: parseInt(person.id?.toString()),
            cakes: cakeDTO,
            drinks: [{
                id: 1,
                amount: 1
            }]
        };
        const response = await axios.post(OrderRoutes.AddOrder, orderData);
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150, },
        { field: 'price', headerName: 'Price', type: 'number', width: 110 },
        { field: 'weight', headerName: 'Weight', width: 150, type: 'number' },
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
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            disableSelectionOnClick
                            experimentalFeatures={{ newEditingApi: true }}
                        />
                    </Box>
                </div>
            </div>
        </StackItem>
        <Button variant="contained" className={valueStyle} onClick={onClick} >Add Order</Button>
    </Stack >
}