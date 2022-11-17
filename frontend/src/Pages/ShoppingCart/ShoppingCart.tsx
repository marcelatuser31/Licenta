import { Stack, StackItem } from "@fluentui/react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridCallbackDetails, GridColDef, GridEditRowsModel, GridEventListener, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { ORDER_LIST_KEY, PERSON_KEY } from "../../Utils/constants";
import { IPerson } from "../../Utils/Models/IPerson";
import { OrderRoutes } from "../../Utils/Routes/backEndRoutes";
import { IItemOrder } from "../Cake/Cake.types";
import { addOrderButtonStyle, boxStyle, deleteButtonStyles, innerDiv, listStyle, outerDiv } from "./ShoppingCart.Styles";
import { IItemDTO, IOrderData } from "./ShoppingCart.types";
import DeleteIcon from '@mui/icons-material/Delete';

export const ShoppingCart = (): JSX.Element => {
    const orderList: IItemOrder[] = JSON.parse(localStorage.getItem(ORDER_LIST_KEY) as string)
    const person: IPerson = JSON.parse(localStorage.getItem(PERSON_KEY) as string)
    const [items, setItems] = useState<IItemOrder[]>(JSON.parse(localStorage.getItem(ORDER_LIST_KEY) as string))
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const cakeDTO: IItemDTO[] = orderList.map((cake: IItemOrder) => {
        return {
            id: cake.cakeId,
            amount: 1
        }
    })

    const rows: any = items.map((cake: IItemOrder) => {
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
            cakes: cakeDTO,
            drinks: [{
                id: 1,
                amount: 1
            }]
        };
        const response = await axios.post(OrderRoutes.AddOrder, orderData);
    }

    const onSelectionModelChange = (selectedItems: any): void => {
        setSelectedItems(selectedItems)
    }

    const onDeleteItems = (): void => {
        const newItems: IItemOrder[] = items.filter((item: IItemOrder) => !selectedItems.includes(item.cakeId))
        setItems(newItems)
        localStorage.setItem(ORDER_LIST_KEY, JSON.stringify(newItems))
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', resizable: true },
        { field: 'name', headerName: 'Name', width: 150, },
        { field: 'price', headerName: 'Price', type: 'number', width: 110 },
        { field: 'weight', headerName: 'Weight', width: 150, type: 'number' },
        { field: 'amount', headerName: 'Amount', type: 'number' },
        { field: 'cakeMessage', headerName: 'Cake Message', width: 180, editable: true }
    ];

    const CustomToolbar = (): JSX.Element => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
                <Button variant="text" onClick={onDeleteItems} startIcon={<DeleteIcon />} style={deleteButtonStyles}>Delete</Button>
            </GridToolbarContainer>
        );
    }

    return <Stack>
        <StackItem>
            <Navbar />
        </StackItem>
        <StackItem>
            <div className={outerDiv}>
                <div className={innerDiv}>
                    <Box className={`${listStyle} ${innerDiv}`} sx={boxStyle}>
                        <DataGrid
                            components={{ Toolbar: CustomToolbar }}
                            componentsProps={{ toolbar: { left: 2 } }}
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            experimentalFeatures={{ newEditingApi: true }}
                            onSelectionModelChange={onSelectionModelChange}
                        />
                    </Box>
                </div>
                <Button variant="contained" className={`${addOrderButtonStyle} ${innerDiv}`} onClick={onClick} >Add Order</Button>
            </div>
        </StackItem>
    </Stack >
}