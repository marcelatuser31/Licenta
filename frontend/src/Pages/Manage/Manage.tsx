import { Stack, StackItem } from "@fluentui/react"
import { Box } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import axios from "axios"
import { useEffect, useState } from "react"
import { GroupedList } from "../../components/List/GroupedList"
import { Navbar } from "../../components/Navbar/Navbar"
import { ICake } from "../../Utils/Models/ICake"
import { IDrink } from "../../Utils/Models/IDrink"
import { CakeRoutes, DrinkRoutes } from "../../Utils/Routes/backEndRoutes"
import { boxStyle, innerDiv, listStyle, outerDiv } from "../ShoppingCart/ShoppingCart.Styles"

export const Manage = (): JSX.Element => {
    const [cakes, setCakes] = useState<ICake[]>([])
    const [drinks, setDrinks] = useState<IDrink[]>([])

    useEffect(() => {
        const getData = async (): Promise<void> => {
            let response = await axios.get(CakeRoutes.GetAll)
            setCakes(response.data)

            response = await axios.get(DrinkRoutes.GetAll)
            setDrinks(response.data)
        }
        getData()
    }, [])

    const cakeRows: any[] = cakes.map((cake: ICake) => {
        return {
            id: cake.id,
            price: cake.price,
            name: cake.name,
            weight: cake.weight,
            amount: cake.amount,
            type: 'Cake'
        }
    })

    const drinkRows: any[] = drinks.map((drink: IDrink) => {
        return {
            id: drink.id,
            price: drink.price,
            name: drink.name,
            weight: drink.weight,
            amount: drink.amount,
            type: 'Drink'
        }
    })

    const rows: any = [...cakeRows, ...drinkRows]

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID' },
        { field: 'name', headerName: 'Name', width: 150, },
        { field: 'price', headerName: 'Price', type: 'number', width: 110 },
        { field: 'weight', headerName: 'Weight', width: 150, type: 'number' },
        { field: 'amount', headerName: 'Amount', type: 'number' },
        { field: 'type', headerName: 'Type' }
    ];

    return <>
        <Stack>
            <StackItem>
                <Navbar />
            </StackItem>
            <StackItem>
                <div className={outerDiv}>
                    <div className={innerDiv}>
                        <Box className={`${listStyle} ${innerDiv}`} sx={boxStyle}>
                            <GroupedList groupByColumn={'type'} items={rows} columns={columns} addButton={true} />
                        </Box>
                    </div>
                </div>
            </StackItem>
        </Stack >
    </>
}