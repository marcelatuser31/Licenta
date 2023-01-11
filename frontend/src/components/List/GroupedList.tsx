import { Button } from "@mui/material";
import { DataGridPremium, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, useGridApiRef, useKeepGroupedColumnsHidden } from "@mui/x-data-grid-premium"
import { GridApiPremium } from "@mui/x-data-grid-premium/models/gridApiPremium";
import { MutableRefObject, useEffect, useState } from "react";
import { addButtonStyle, dataGridStyle, deleteButtonStyle } from "./CustomList.styles";
import { ICustomListProps } from "./CustomList.types"
import DeleteIcon from '@mui/icons-material/Delete';
import { getMessage } from "../../Utils/methods";
import { SweetAlertIcon } from "../../Utils/enums";
import { ARE_YOU_SURE, QUESTION_MESSAGE } from "../../Utils/constants";
import { CustomDialog } from "../CustomDialog/CustomDialog";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { IItem } from "../../Pages/SelectedItem/SelectedCake.types";

export const GroupedList = (props: ICustomListProps): JSX.Element => {
    const [items, setItems] = useState<IItem[]>(props.items);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        setItems(props.items)
    }, [props.items])

    const onDeleteItems = (): void => {
        const newItems: any[] = items.filter((item: any) => !selectedItems.includes(item.id));
        const deletedItems: any[] = items.filter((item: any) => selectedItems.includes(item.id));
        setItems(newItems);

        if (props.onDeleteItems)
            props.onDeleteItems(deletedItems);
    }

    const onDelete = (event: any): void => {
        getMessage(SweetAlertIcon.Question, QUESTION_MESSAGE, ARE_YOU_SURE, onDeleteItems)
    }

    const CustomToolbar = (): JSX.Element => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
                {props.showManageButtons
                    && <Button variant="text" onClick={() => props.onManage(false)} startIcon={<AddCircleOutlineIcon />} style={addButtonStyle}>Add</Button>}
                <Button variant="text" onClick={onDelete} disabled={selectedItems.length == 0} startIcon={<DeleteIcon />} style={deleteButtonStyle}>Delete</Button>
                {props.showManageButtons
                    && <Button variant="text" disabled={selectedItems.length !== 1} onClick={() => props.onManage(true)} startIcon={<ManageSearchIcon style={{ position: "relative", bottom: 1, left: 2 }} />} style={{ ...addButtonStyle }}>Edit</Button>}
            </GridToolbarContainer>
        );
    }

    const getGroupedData = (): any => {
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
            columns: {
                columnVisibilityModel: { id: false }
            }
        },
    });

    const onSelectionModelChange = (selectedItems: string[]): void => {
        setSelectedItems(selectedItems)

        if (props.setSelectedItems)
            props.setSelectedItems(selectedItems);
    }

    return <div>
        <DataGridPremium
            style={dataGridStyle(props.heigth, props.width)}
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
    </div>
}