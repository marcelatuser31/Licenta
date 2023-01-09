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
import { CustomDialog } from "../../components/CustomDialog/CustomDialog"

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
    const [cakes, setCakes] = useState<ICake[]>([]);
    const [drinks, setDrinks] = useState<IDrink[]>([]);
    const [selectedCake, setSelectedCake] = useState<ICake>(defaultCake);
    const [selectedDrink, setSelectedDrink] = useState<IDrink>(defaultDrink);
    const [addSelectedOption, setAddSelectedOption] = useState<string>(CAKE);
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);
    const [allIngredients, setAllIngredients] = useState<IIngredient[]>([]);
    const [shouldDisplayNewIngredient, setShouldDisplayNewIngredient] = React.useState<boolean>(false);
    const [newIngredient, setNewIngredient] = React.useState<IIngredient>(defaultIngredient);
    const [isAdded, setIsAdded] = React.useState<boolean>(false);
    const itemFields: ItemField[] = [ItemField.Name, ItemField.Price, ItemField.Weight, ItemField.Amount];
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    useEffect(() => {
        const getData = async (): Promise<void> => {
            let response = await axios.get(CakeRoutes.GetAll)
            setCakes(response.data)

            response = await axios.get(DrinkRoutes.GetAll)
            setDrinks(response.data)

            response = await axios.get(IngredientRoutes.GetAll)
            setIngredients(response.data)
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
        await axios.post(CakeRoutes.AddCake, { ...selectedCake, ingredients: ingredients });
        getMessage(SweetAlertIcon.Succes, SUCCESSFULLY, ADD_MESSAGE)

        let response = await axios.get(CakeRoutes.GetAll)
        setCakes(response.data)
    }

    const onSaveDrink = async (): Promise<void> => {
        await axios.post(DrinkRoutes.AddDrink, selectedDrink);
        getMessage(SweetAlertIcon.Succes, SUCCESSFULLY, ADD_MESSAGE)

        let response = await axios.get(DrinkRoutes.GetAll)
        setDrinks(response.data)
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

    const getValue = (field: ItemField, item: any): string | IIngredient[] => {
        if (!item)
            return "";

        switch (field) {
            case ItemField.Amount:
                return item.amount;
            case ItemField.Name:
                return item.name;
            case ItemField.Price:
                return item.price;
            case ItemField.Weight:
                return item.weight;
        }
        return "";
    }

    const getFields = (item: any): JSX.Element => {
        return <div>
            {itemFields.map((label: ItemField) =>
                isEditMode ? <TextField
                    autoFocus={true}
                    margin="dense"
                    id={label}
                    label={label}
                    fullWidth
                    defaultValue={isEditMode ? getValue(label, item) : ""}
                    variant="standard"
                    name={label}
                    onChange={(isCakeSelected()) ? onChangeCake : onChangeDrink}
                    type={label === ItemField.Name ? 'text' : 'Number'}
                    InputProps={{ inputProps: { min: 1, max: 100 } }}
                /> :
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
        </div>
    }

    const getDialogContent = (): JSX.Element => {
        const item = rows.find((i: any) => i.id === selectedItems[0]);

        let ingredientsList: IIngredient[] = [];
        const cake: ICake | undefined = cakes.find((i: any) => i.id === item?.id);

        if (cake)
            ingredientsList = cake.ingredients;

        return <div>
            {!isEditMode && <ChoiceGroup onChange={onChoiceGroupChange}
                options={options}
                styles={choiceGroupStyle}
                defaultSelectedKey={addSelectedOption}
            />}
            {getFields(item)}

            {isCakeSelected() && <IngredientsList
                availableIngredients={allIngredients.filter((ingredient: IIngredient) => !ingredientsList.includes(ingredient))}
                selectedIngredients={ingredientsList}
                setIngredients={setIngredients}
                setShouldDisplayNewIngredient={setShouldDisplayNewIngredient}
                isAdded={isAdded} />
            }
            {(shouldDisplayNewIngredient) && addIngredientContent}
        </div >
    }

    const onManage = (isEditMode: boolean): void => {
        setOpenDialog(true)
        setIsEditMode(isEditMode);
    }

    const onDeleteItems = async (deletedItems: any): Promise<void> => {
        deletedItems.forEach(async (item: any) =>
            await axios.post(CakeRoutes.DeleteCake, deletedItems[0].id as string)
        )

        const response = await axios.get(CakeRoutes.GetAll);
        setCakes(response.data);
    }

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
                                showManageButtons={true}
                                onManage={onManage}
                                setSelectedItems={setSelectedItems}
                                width={1150}
                                onDeleteItems={onDeleteItems}
                            />
                        </Box>
                    </div>
                </div>
                <CustomDialog
                    openDialog={openDialog}
                    content={getDialogContent()}
                    title={isCakeSelected() ? isEditMode ? "Edit Cake" : ADD_CAKE : isEditMode ? "Edit Drink" : ADD_DRINK}
                    onSubmit={isCakeSelected() ? onSaveCake : onSaveDrink}
                    onClose={() => setOpenDialog(false)}
                    addButton={true}></CustomDialog>
            </StackItem>
        </Stack >
    </>
}