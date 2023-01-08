import { ChoiceGroup, IChoiceGroupOption, Stack, StackItem } from "@fluentui/react"
import { Box, IconButton, TextField } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import axios from "axios"
import React from "react"
import { useEffect, useState } from "react"
import { IngredientsList } from "../../components/IngredientsList/IngredientsList"
import { GroupedList } from "../../components/List/GroupedList"
import { Navbar } from "../../components/Navbar/Navbar"
import { ADD_CAKE, ADD_DRINK, ADD_MESSAGE, CAKE, DRINK, SUCCESSFULLY } from "../../Utils/constants"
import { ItemField, SweetAlertIcon } from "../../Utils/enums"
import { getMessage } from "../../Utils/methods"
import { ICake } from "../../Utils/Models/ICake"
import { IDrink } from "../../Utils/Models/IDrink"
import { IIngredient } from "../../Utils/Models/IIngredient"
import { CakeRoutes, DrinkRoutes, IngredientRoutes } from "../../Utils/Routes/backEndRoutes"
import { choiceGroupStyle } from "../SelectedItem/SelectedCake.styles"
import { boxStyle, innerDiv, listStyle, outerDiv } from "../ShoppingCart/ShoppingCart.Styles"
import AddIcon from '@mui/icons-material/Add';

const options: IChoiceGroupOption[] = [
    { key: CAKE, text: CAKE, styles: { root: { marginLeft: 20 } } },
    { key: DRINK, text: DRINK, styles: { root: { marginLeft: 20 } } },
];

export const defaultDrink: IDrink = {
    id: "",
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

const defaultIngredient: IIngredient = {
    id: "",
    name: ""
}

export const Manage = (): JSX.Element => {
    const [cakes, setCakes] = useState<ICake[]>([])
    const [drinks, setDrinks] = useState<IDrink[]>([])
    const [selectedCake, setSelectedCake] = useState<ICake>(defaultCake);
    const [selectedDrink, setSelectedDrink] = useState<IDrink>(defaultDrink);
    const [addSelectedOption, setAddSelectedOption] = useState<string>(CAKE);
    const [ingredients, setIngredients] = useState<IIngredient[]>([])
    const [shouldDisplayNewIngredient, setShouldDisplayNewIngredient] = React.useState<boolean>(false)
    const [newIngredient, setNewIngredient] = React.useState<IIngredient>(defaultIngredient)
    const [isAdded, setIsAdded] = React.useState<boolean>(false)
    const itemFields: string[] = [ItemField.Name, ItemField.Price, ItemField.Weight, ItemField.Amount]

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
            type: CAKE
        }
    })

    const drinkRows: any[] = drinks.map((drink: IDrink) => {
        return {
            id: drink.id,
            price: drink.price,
            name: drink.name,
            weight: drink.weight,
            amount: drink.amount,
            type: DRINK
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
                setSelectedCake({ ...selectedCake, name: value })
                break
            case ItemField.Price:
                setSelectedCake({ ...selectedCake, price: value })
                break
            case ItemField.Amount:
                setSelectedCake({ ...selectedCake, amount: value })
                break
            case ItemField.Weight:
                setSelectedCake({ ...selectedCake, weight: value })
                break
        }
    }

    const onChangeDrink = (event: any): void => {
        const value: any = event.target.value;
        const name: string = event.target.name;
        switch (name) {
            case ItemField.Name:
                setSelectedDrink({ ...selectedDrink, name: value })
                break
            case ItemField.Price:
                setSelectedDrink({ ...selectedDrink, price: value })
                break
            case ItemField.Amount:
                setSelectedDrink({ ...selectedDrink, amount: value })
                break
            case ItemField.Weight:
                setSelectedDrink({ ...selectedDrink, weight: value })
                break
        }
    }

    const onChangeIngredient = (event: any): void => {
        const value: string = event.target.value
        setNewIngredient({ ...newIngredient, name: value })
    }

    const onSaveCake = async (): Promise<void> => {
        setSelectedCake({ ...selectedCake, ingredients: ingredients })
        await axios.post(CakeRoutes.AddCake, selectedCake);
        getMessage(SweetAlertIcon.Succes, SUCCESSFULLY, ADD_MESSAGE)
    }

    const onSaveDrink = async (): Promise<void> => {
        await axios.post(DrinkRoutes.AddDrink, selectedDrink);
        getMessage(SweetAlertIcon.Succes, SUCCESSFULLY, ADD_MESSAGE)
    }

    const onSaveNewIngredient = async (): Promise<void> => {
        await axios.post(IngredientRoutes.AddIngredient, newIngredient)
        setShouldDisplayNewIngredient(false)
        setIsAdded(!isAdded)
    }

    const onChoiceGroupChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, option?: IChoiceGroupOption | undefined): void => {
        if (option === undefined)
            return

        setAddSelectedOption(option.text)
    }

    const isCakeSelected = (): boolean | undefined => {
        return addSelectedOption === CAKE
    }

    const addIngredientContent: JSX.Element =
        <Stack horizontal={true}>
            <StackItem>
                <TextField
                    autoFocus
                    margin="dense"
                    id="Ingredient"
                    label="Ingredient"
                    fullWidth
                    variant="standard"
                    name="Ingredient"
                    type="text"
                    onChange={onChangeIngredient}
                />
            </StackItem>
            <StackItem>
                <IconButton onClick={onSaveNewIngredient} style={{ top: 20 }}>
                    <AddIcon />
                </IconButton>
            </StackItem>
        </Stack>

    const dialogContent: JSX.Element =
        <div>
            <ChoiceGroup onChange={onChoiceGroupChange}
                options={options}
                styles={choiceGroupStyle}
                defaultSelectedKey={addSelectedOption}
            />
            {itemFields.map((label: string) =>
                <TextField
                    autoFocus={true}
                    margin="dense"
                    id={label}
                    label={label}
                    fullWidth
                    variant="standard"
                    name={label}
                    onChange={(isCakeSelected()) ? onChangeCake : onChangeDrink}
                    type={label === ItemField.Name ? 'text' : 'Number'}
                    InputProps={{ inputProps: { min: 1, max: 100 } }}
                />)}
            {(isCakeSelected())
                && <IngredientsList setIngredients={setIngredients} setShouldDisplayNewIngredient={setShouldDisplayNewIngredient} isAdded={isAdded} />
            }
            {(shouldDisplayNewIngredient) && addIngredientContent}
        </div >

    return <>
        <Stack>
            <StackItem>
                <Navbar />
            </StackItem>
            <StackItem>
                <div className={outerDiv}>
                    <div className={innerDiv}>
                        <Box className={`${listStyle} ${innerDiv}`} sx={boxStyle}>
                            <GroupedList groupByColumn={'type'}
                                items={rows}
                                columns={columns}
                                addButton={true}
                                dialogContent={dialogContent}
                                dialogTitle={(isCakeSelected()) ? ADD_CAKE : ADD_DRINK}
                                onSave={(isCakeSelected()) ? onSaveCake : onSaveDrink}
                                width={1150} />
                        </Box>
                    </div>
                </div>
            </StackItem>
        </Stack >
    </>
}