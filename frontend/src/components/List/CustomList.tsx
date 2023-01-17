import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';
import { useState } from "react";
import { ARE_YOU_SURE, QUESTION_INFO_MESSAGE } from '../../Utils/constants';
import { SweetAlertIcon } from '../../Utils/enums';
import { getMessage } from '../../Utils/methods';
import { dataGridStyle, deleteButtonStyle } from './CustomList.styles';
import './CustomList.styles.ts';
import { ICustomListProps } from "./CustomList.types";

export const CustomList = (props: ICustomListProps): JSX.Element => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [items, setItems] = useState<any[]>(props.items);
    const initialState: GridInitialStateCommunity = { columns: { columnVisibilityModel: { id: false } } }

    const onDeleteItems = (): void => {
        const newItems: any[] = items.filter((item: any) => !selectedItems.includes(item.id));
        setItems(newItems);

        if (props.onDeleteItems)
            props.onDeleteItems(newItems);
    }

    const onClick = (event: any): void => {
        getMessage(SweetAlertIcon.Question, QUESTION_INFO_MESSAGE, ARE_YOU_SURE, onDeleteItems)
    }

    const CustomToolbar = (): JSX.Element => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
                <Button variant="text" onClick={onClick} startIcon={<DeleteIcon />} style={deleteButtonStyle}>Delete</Button>
            </GridToolbarContainer>
        );
    }

    const onSelectionModelChange = (selectedItems: any[]): void => {
        setSelectedItems(selectedItems)
    }

    return <DataGrid
        initialState={initialState}
        style={dataGridStyle(props?.heigth, props?.width)}
        components={{ Toolbar: CustomToolbar }}
        componentsProps={{ toolbar: { left: 2 } }}
        rows={items}
        columns={props.columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={onSelectionModelChange}
    />
}