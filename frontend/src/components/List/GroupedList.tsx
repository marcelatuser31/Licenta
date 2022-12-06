import { Button, TextField } from "@mui/material";
import { DataGridPremium, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, useGridApiRef, useKeepGroupedColumnsHidden } from "@mui/x-data-grid-premium"
import { GridApiPremium } from "@mui/x-data-grid-premium/models/gridApiPremium";
import { MutableRefObject, useEffect, useState } from "react";
import { AddButtonStyle, deleteButtonStyle } from "./CustomList.styles";
import { ICustomListProps } from "./CustomList.types"
import DeleteIcon from '@mui/icons-material/Delete';
import { getMessage } from "../../Utils/methods";
import { ItemField, SweetAlertIcon } from "../../Utils/enums";
import { ADD_CAKE, ADD_DRINK, ADD_MESSAGE, ARE_YOU_SURE, CAKE, DRINK, NO, QUESTION_MESSAGE, SUCCESSFULLY, YES } from "../../Utils/constants";
import { CustomDialog } from "../CustomDialog/CustomDialog";
import { ICake } from "../../Utils/Models/ICake";
import axios from "axios";
import { CakeRoutes, DrinkRoutes } from "../../Utils/Routes/backEndRoutes";
import { IDrink } from "../../Utils/Models/IDrink";
import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react";
import { choiceGroupStyle } from "../../Pages/SelectedItem/SelectedCake.styles";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const options: IChoiceGroupOption[] = [
    { key: CAKE, text: CAKE, styles: { root: { marginLeft: 20 } } },
    { key: DRINK, text: DRINK, styles: { root: { marginLeft: 20 } } },
];

export const defaultCake: ICake = {
    id: 0,
    name: "",
    price: 0,
    weight: 0,
    amount: 0,
    ingredients: [],
    expirationDate: undefined,
    image: ''
}

export const defaultDrink: IDrink = {
    id: 0,
    name: "",
    weight: 0,
    price: 0,
    amount: 0,
    image: ''
}

export const GroupedList = (props: ICustomListProps): JSX.Element => {
    const [items, setItems] = useState<any[]>(props.items);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [cake, setCake] = useState<ICake>(defaultCake);
    const [drink, setDrink] = useState<IDrink>(defaultDrink);
    const drinkField: string[] = [ItemField.Name, ItemField.Price, ItemField.Weight, ItemField.Amount]
    const cakeField: string[] = [ItemField.Name, ItemField.Price, ItemField.Weight, ItemField.Amount, ItemField.Ingredients]
    const [addSelectedOption, setAddSelectedOption] = useState<IChoiceGroupOption | undefined>();
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    useEffect(() => {
        setItems(props.items)
    }, [props.items])

    const onDeleteItems = (): void => {
        const newItems: any[] = items.filter((item: any) => !selectedItems.includes(item.id));
        setItems(newItems);

        if (props.onDeleteItems)
            props.onDeleteItems(newItems);
    }

    const onClick = (event: any): void => {
        getMessage(SweetAlertIcon.Question, QUESTION_MESSAGE, ARE_YOU_SURE, onDeleteItems)
    }

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

    const dialogContent: JSX.Element =
        <div>
            <ChoiceGroup onChange={onCheckBoxGroupChange}
                options={options}
                styles={choiceGroupStyle}
            />
            {addSelectedOption?.key === CAKE
                ? cakeField.map((label: string) =>
                    <TextField
                        autoFocus
                        margin="dense"
                        id={label}
                        label={label}
                        fullWidth
                        variant="standard"
                        name={label}
                        onChange={onChangeCake}
                        type={label === ItemField.Name ? 'text' : 'Number'}
                    />)
                : drinkField.map((label: string) =>
                    <TextField
                        autoFocus
                        margin="dense"
                        id={label}
                        label={label}
                        fullWidth
                        variant="standard"
                        name={label}
                        onChange={onChangeDrink}
                        type={label === ItemField.Name ? 'text' : 'Number'}
                    />)}
        </div>

    const onAddClick = (): void => {
        setOpenDialog(true)
    }

    const onClose = (): void => {
        setOpenDialog(false)
    }

    const CustomToolbar = (): JSX.Element => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
                <Button variant="text" onClick={onClick} startIcon={<DeleteIcon />} style={deleteButtonStyle}>Delete</Button>
                {props.addButton
                    && <Button variant="text" onClick={onAddClick} startIcon={<AddCircleOutlineIcon />} style={AddButtonStyle}>Add</Button>}
            </GridToolbarContainer>
        );
    }

    const getGroupedData = (): any => {
        console.log(items)
        return {
            columns: props.columns,
            initialState: {},
            rows: items
        };
    };

    const apiRef: MutableRefObject<GridApiPremium> = useGridApiRef();

    const initialState = useKeepGroupedColumnsHidden({
        apiRef,
        initialState: {
            rowGrouping: {
                model: [props.groupByColumn || ''],
            },
        },
    });

    const onSelectionModelChange = (selectedItems: any[]): void => {
        setSelectedItems(selectedItems)
    }

    return <div>
        <DataGridPremium
            style={{ height: props.heigth || 700 }}
            components={{ Toolbar: CustomToolbar }}
            {...getGroupedData()}
            apiRef={apiRef}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
            initialState={initialState}
            experimentalFeatures={{ newEditingApi: true }}
            onSelectionModelChange={onSelectionModelChange}
        />
        <CustomDialog openDialog={openDialog} content={dialogContent} title={addSelectedOption?.key === CAKE ? ADD_CAKE : ADD_DRINK} onSubmit={addSelectedOption?.key === CAKE ? onSaveCake : onSaveDrink} onClose={onClose} addButton={true}></CustomDialog>
    </div>
}