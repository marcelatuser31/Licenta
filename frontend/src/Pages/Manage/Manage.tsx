import { ChoiceGroup, IChoiceGroupOption, Stack, StackItem } from "@fluentui/react"
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, IconButton, TextField, TextFieldProps } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { ICake } from "../../Utils/Models/ICake"
import { IDrink } from "../../Utils/Models/IDrink"
import { IIngredient } from "../../Utils/Models/IIngredient"
import { CakeRoutes, DrinkRoutes, IngredientRoutes } from "../../Utils/Routes/backEndRoutes"
import { ADD_MESSAGE, CAKE, DRINK, SUCCESSFULLY } from "../../Utils/constants"
import { ItemField, SweetAlertIcon } from "../../Utils/enums"
import { getMessage, onUploadPhoto } from "../../Utils/methods"
import { CustomDialog } from "../../components/CustomDialog/CustomDialog"
import { CustomDropdown } from "../../components/CustomDropdown/CustomDropdown"
import { IngredientsList } from "../../components/IngredientsList/IngredientsList"
import { GroupedList } from "../../components/List/GroupedList"
import { Navbar } from "../../components/Navbar/Navbar"
import { Input } from "../Cakes/Cakes"
import { choiceGroupStyle } from "../SelectedItem/SelectedCake.styles"
import { IItem } from "../SelectedItem/SelectedCake.types"
import { boxStyle, innerDiv, listStyle, outerDiv } from "../ShoppingCart/ShoppingCart.Styles"

const options: IChoiceGroupOption[] = [
    { key: CAKE, text: CAKE },
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
    type: "ana are mer"
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
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    useEffect(() => {
        const getData = async (): Promise<void> => {
            let response = await axios.get(CakeRoutes.GetAll)
            setCakes(response.data)

            response = await axios.get(DrinkRoutes.GetAll)
            setDrinks(response.data)

            response = await axios.get(IngredientRoutes.GetAll)
            // setIngredients(response.data);
            setAllIngredients(response.data)
        }
        getData()
    }, [])

    const cakeRows: IItem[] = cakes?.map((cake: ICake) => {
        return {
            id: cake.id, price: cake.price,
            name: cake.name,
            weight: cake.weight,
            amount: cake.amount,
            cakeType: cake.type,
            type: CAKE
        }
    })

    const drinkRows: IItem[] = drinks?.map((drink: IDrink) => {
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
        { field: 'type', headerName: 'Type' },
        { field: 'cakeType', headerName: 'Type' }
    ];

    const onChangeField = (event: any, [state, setState]: [ICake | IDrink | IIngredient, (s: any) => void]): void => {
        const value: any = event.target.value;
        const name: string = event.target.name;
        setState({ ...state, [name]: value })
    }

    const getSelectedItem = (): IItem => {
        return rows.find((i: IItem) => i.id === selectedItems[0]);
    }

    const getDifferentField = (item: IDrink | ICake) => {
        let object = {};
        if (item.amount !== defaultCake.amount) {
            object = { ...object, amount: item.amount }
        }
        if (item.name !== defaultCake.name) {
            object = { ...object, name: item.name }
        }
        if (item.price !== defaultCake.price) {
            object = { ...object, price: item.price }
        }
        if (item.weight !== defaultCake.weight) {
            object = { ...object, weight: item.weight }
        }
        return object;
    }

    const onCakeAction = async (): Promise<void> => {
        const path: string = isEditMode ? CakeRoutes.Update : CakeRoutes.AddCake;

        const type = getSelectedItem().cakeType
        const cake: any = {
            ...getSelectedItem(),
            ...getDifferentField(selectedCake),
            ingredients: ingredients,
            image: "",
            id: isEditMode ? getSelectedItem().id : "",
            type: getSelectedItem().cakeType || ""
        }
        const response = await axios.post(path, cake);
        getMessage(SweetAlertIcon.Succes, SUCCESSFULLY, ADD_MESSAGE)
        setCakes(response.data)
    }

    const onDrinkAction = async (): Promise<void> => {
        const path: string = isEditMode ? DrinkRoutes.Update : DrinkRoutes.AddDrink;

        const drink: any = { ...getSelectedItem(), ...getDifferentField(selectedDrink), id: isEditMode ? getSelectedItem().id : "" }
        const response = await axios.post(path, drink);

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
        if (getSelectedItem() === undefined)
            return addSelectedOption === CAKE;
        return addSelectedOption === CAKE && getSelectedItem()?.type === CAKE;
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
                    onChange={(event: any) => onChangeField(event, [newIngredient, setNewIngredient])}
                />
            </StackItem>
            <StackItem>
                <IconButton onClick={onSaveNewIngredient} style={{ top: 20 }}>
                    <AddIcon />
                </IconButton>
            </StackItem>
        </Stack>

    const getValue = (field: ItemField, item: IItem): string => {
        if (!item)
            return "";

        switch (field) {
            case ItemField.Amount:
                return item?.amount.toString();
            case ItemField.Name:
                return item?.name;
            case ItemField.Price:
                return item?.price.toString();
            case ItemField.Weight:
                return item?.weight?.toString();
        }
        return "";
    }

    const getFields = (item: any): JSX.Element => {
        const object = (label: string): TextFieldProps => {
            return {
                autoFocus: true,
                margin: "normal",
                id: label,
                fullWidth: true,
                variant: "standard",
                name: label,
                onChange: (event: any) => (isCakeSelected()) ? onChangeField(event, [selectedCake, setSelectedCake]) : onChangeField(event, [selectedDrink, setSelectedDrink]),
                type: label === ItemField.Name ? 'text' : 'Number',
                InputProps: { inputProps: { min: 1, max: 100 } }
            }
        };
        return <div>{itemFields.map((label: ItemField) =>
            isEditMode
                ? <TextField {...object(label)} defaultValue={isEditMode ? getValue(label, item) : ""} />
                : <TextField {...object(label)} />)}
        </div>
    }

    const getIngredientsList = (ingredientsList: IIngredient[]): JSX.Element => {
        return <div>
            {isCakeSelected() && <IngredientsList
                availableIngredients={allIngredients}
                selectedIngredients={ingredientsList}
                setIngredients={setIngredients}
                setShouldDisplayNewIngredient={setShouldDisplayNewIngredient}
                isAdded={isAdded} />
            }
        </div>
    }

    const getCakeTypeSection = (): JSX.Element => {
        return <div>
            {isCakeSelected() && <CustomDropdown
                options={localStorage.getItem("cakeTypes")?.split(",") || []}
                setDefaultValue={(option: string) => setSelectedCake({ ...selectedCake, type: option })}
                defaultValue={getSelectedItem()?.cakeType || ""}
                name={"Cake Type"} />}
        </div>
    }

    const getChoiseGroupSection = (): JSX.Element => {
        return <div>
            {!isEditMode && <ChoiceGroup onChange={onChoiceGroupChange}
                options={options}
                styles={choiceGroupStyle}
                defaultSelectedKey={addSelectedOption}
            />}
        </div>
    }

    const getUploadImageSection = (): JSX.Element => {
        return <Button variant="contained" component="label">
            Upload
            <Input
                accept='image/*'
                id='contained-button-file'
                multiple
                type='file'
                onChange={(event: any) => onUploadPhoto(
                    event,
                    getSelectedItem().id || "",
                    getSelectedItem().type === CAKE ? CakeRoutes.AddImage : DrinkRoutes.AddImage)} />
        </Button>
    }

    const getDialogContent = (): JSX.Element => {
        const item: IItem = getSelectedItem();
        let ingredientsList: IIngredient[] = cakes.find((i: any) => i.id === item?.id)?.ingredients || [];

        return <div>
            {getChoiseGroupSection()}
            {getFields(item)}
            {getIngredientsList(ingredientsList)}
            {getCakeTypeSection()}
            {getUploadImageSection()}
            {shouldDisplayNewIngredient && addIngredientContent}
        </div >
    }

    const onManage = (isEditMode: boolean): void => {
        setOpenDialog(true)
        setIsEditMode(isEditMode);
    }

    const onDeleteItems = async (deletedItems: any): Promise<void> => {
        deletedItems.forEach(async (item: any) =>
            await axios.post(CakeRoutes.DeleteCake, item.id as string)
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
                    title={isCakeSelected() ? isEditMode ? "Edit Cake" : "Add" : isEditMode ? "Edit Drink" : "Add"}
                    onSubmit={isCakeSelected() ? onCakeAction : onDrinkAction}
                    onClose={() => setOpenDialog(false)}
                    addButton={true}
                    submitButtonLabel={isEditMode ? "Update" : "Add"}
                ></CustomDialog>
            </StackItem>
        </Stack >
    </>
}