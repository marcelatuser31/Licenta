import { IChoiceGroupOption } from "@fluentui/react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useState } from "react";
import { Header } from "../../components/Header/Header";
import { ICakeOrder } from "../Cake/Cake.types";
import { listStyle } from "./ShoppingCart.Styles";

export const ShoppingCart = (): JSX.Element => {
    const newCakeList: ICakeOrder[] = JSON.parse(localStorage.getItem('order') as string)

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


    // id: 1, price: 10, cakeMessage: "adwesrdfgh", weight: 15



    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
        },
        {
            field: 'price',
            headerName: 'Price',
            type: 'number',
            width: 110,
        },
        {
            field: 'cakeMessage',
            headerName: 'Cake Message',
            width: 180,
            editable: true,
        },
        {
            field: 'weight',
            headerName: 'Weight',
            width: 150,
            type: 'number'
        },
    ];



    return <>

        <Header cakeTypes={[]} setSelectedType={function (state: string): void {
            throw new Error("Function not implemented.");
        }} />
        <Box className={listStyle} sx={{ height: '700px', width: '65%' }}>
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

    </>
}