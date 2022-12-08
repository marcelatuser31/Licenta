import { ChoiceGroup, IChoiceGroupOption, Stack, StackItem } from "@fluentui/react"
import { Box, TextField } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import axios from "axios"
import { useEffect, useState } from "react"
import { GroupedList } from "../../components/List/GroupedList"
import { Navbar } from "../../components/Navbar/Navbar"
import { ADD_CAKE, ADD_DRINK, ADD_MESSAGE, CAKE, DRINK, SUCCESSFULLY } from "../../Utils/constants"
import { ItemField, SweetAlertIcon } from "../../Utils/enums"
import { getMessage } from "../../Utils/methods"
import { ICake } from "../../Utils/Models/ICake"
import { IDrink } from "../../Utils/Models/IDrink"
import { CakeRoutes, DrinkRoutes } from "../../Utils/Routes/backEndRoutes"
import { choiceGroupStyle } from "../SelectedItem/SelectedCake.styles"
import { boxStyle, innerDiv, listStyle, outerDiv } from "../ShoppingCart/ShoppingCart.Styles"

const options: IChoiceGroupOption[] = [
    { key: CAKE, text: CAKE, styles: { root: { marginLeft: 20 } } },
    { key: DRINK, text: DRINK, styles: { root: { marginLeft: 20 } } },
];

export const defaultDrink: IDrink = {
    id: 0,
    name: "",
    weight: 0,
    price: 0,
    amount: 0,
    image: ''
}

export const defaultCake: ICake = {
    ...defaultDrink,
    ingredients: [],
    expirationDate: undefined,
}

export const Manage = (): JSX.Element => {
    const [cakes, setCakes] = useState<ICake[]>([])
    const [drinks, setDrinks] = useState<IDrink[]>([])
    const [cake, setCake] = useState<ICake>(defaultCake);
    const [drink, setDrink] = useState<IDrink>(defaultDrink);
    const [addSelectedOption, setAddSelectedOption] = useState<IChoiceGroupOption | undefined>();
    const drinkFields: string[] = [ItemField.Name, ItemField.Price, ItemField.Weight, ItemField.Amount]
    const cakeFields: string[] = [...drinkFields, ItemField.Ingredients]

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

    const onChangeCake = (event: any): void => {
        const value: any = event.target.value;
        const name: string = event.target.name;
        switch (name) {
            case ItemField.Name:
                setCake({ ...cake, name: value })
                break
            case ItemField.Price:
                setCake({ ...cake, price: value })
                break
            case ItemField.Amount:
                setCake({ ...cake, amount: value })
                break
            case ItemField.Weight:
                setCake({ ...cake, weight: value })
                break
        }
    }

    const onChangeDrink = (event: any): void => {
        const value: any = event.target.value;
        const name: string = event.target.name;
        switch (name) {
            case ItemField.Name:
                setDrink({ ...drink, name: value })
                break
            case ItemField.Price:
                setDrink({ ...drink, price: value })
                break
            case ItemField.Amount:
                setDrink({ ...drink, amount: value })
                break
            case ItemField.Weight:
                setDrink({ ...drink, weight: value })
                break
        }
    }

    const onSaveCake = async (): Promise<void> => {
        await axios.post(CakeRoutes.AddCake, cake);
        getMessage(SweetAlertIcon.Succes, SUCCESSFULLY, ADD_MESSAGE)
    }

    const onSaveDrink = async (): Promise<void> => {
        await axios.post(DrinkRoutes.AddDrink, drink);
        getMessage(SweetAlertIcon.Succes, SUCCESSFULLY, ADD_MESSAGE)
    }

    const onCheckBoxGroupChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, option?: IChoiceGroupOption | undefined): void => {
        setAddSelectedOption(option)
    }
    const isCakeSelected = (): boolean | undefined => {
        if (addSelectedOption?.key === CAKE)
            return true
    }

    let itemList: string[] = []
    if (addSelectedOption?.key === CAKE)
        itemList = cakeFields
    else
        itemList = drinkFields

    const dialogContent: JSX.Element =
        <div>
            <ChoiceGroup onChange={onCheckBoxGroupChange}
                options={options}
                styles={choiceGroupStyle}
            />
            {itemList.map((label: string) =>
                <TextField
                    autoFocus
                    margin="dense"
                    id={label}
                    label={label}
                    fullWidth
                    variant="standard"
                    name={label}
                    onChange={(isCakeSelected()) ? onChangeCake : onChangeDrink}
                    type={label === ItemField.Name ? 'text' : 'Number'}
                />)}
        </div>

    return <>
        <Stack>
            <StackItem>
                <Navbar />
            </StackItem>
            <StackItem>
                <div className={outerDiv}>
                    <div className={innerDiv}>
                        <Box className={`${listStyle} ${innerDiv}`} sx={boxStyle}>
                            <GroupedList groupByColumn={'type'} items={rows} columns={columns} addButton={true} dialogContent={dialogContent} dialogTitle={(isCakeSelected()) ? ADD_CAKE : ADD_DRINK} onSave={(isCakeSelected()) ? onSaveCake : onSaveDrink} />
                        </Box>
                    </div>
                </div>
            </StackItem>
        </Stack >
    </>
}