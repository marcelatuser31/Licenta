import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axios from "axios";
import { Header } from "../../components/Header/Header";
import { IPerson } from "../../Utils/Models/IPerson";
import { OrderRoutes } from "../../Utils/Routes/backEndRoutes";
import { valueStyle } from "../Cake/Cake.styles";
import { ICakeOrder } from "../Cake/Cake.types";
import { boxStyle, listStyle } from "./ShoppingCart.Styles";
import { ICakeDTO, IOrderData } from "./ShoppingCart.types";

export const ShoppingCart = (): JSX.Element => {
    const newCakeList: ICakeOrder[] = JSON.parse(localStorage.getItem('order') as string)
    const person: IPerson = JSON.parse(localStorage.getItem('person') as string)
    const personId: number = person.id as number;

    const cakeDTO: ICakeDTO[] =
        newCakeList.map((cake: ICakeOrder) => {
            return {
                id: cake.cakeId,
                amount: 1
            }
        })

    const rows: any =
        newCakeList.map((cake: ICakeOrder) => {
            return {
                id: cake.cakeId,
                price: cake.price,
                name: cake.name,
                cakeMessage: cake.cakeMessage,
                weight: cake.weight
            }
        })

    const onClick = async (event: any): Promise<void> => {
        const orderData: IOrderData = {
            id: personId,
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
        { field: 'cakeMessage', headerName: 'Cake Message', width: 180, editable: true },
        { field: 'weight', headerName: 'Weight', width: 150, type: 'number' },
    ];

    return <>
        <Header />
        <Box className={listStyle} sx={boxStyle}>
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
        <Button variant="contained" className={valueStyle} onClick={onClick} >Add to cart</Button>
    </>
}