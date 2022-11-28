import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { DataGridPremium, useGridApiRef, useKeepGroupedColumnsHidden } from '@mui/x-data-grid-premium';
import { GridApiPremium } from '@mui/x-data-grid-premium/models/gridApiPremium';
import { MutableRefObject, useEffect, useState } from "react";
import { deleteButtonStyle } from './CustomList.styles';
import './CustomList.styles.ts';
import { ICustomListProps } from "./CustomList.types";

export const CustomList = (props: ICustomListProps): JSX.Element => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [items, setItems] = useState<any[]>(props.items);

    const onDeleteItems = (): void => {

        const newItems: any[] = items.filter((item: any) => !selectedItems.includes(item.id));
        setItems(newItems);

        if (props.onDeleteItems)
            props.onDeleteItems(newItems);

    }
    const CustomToolbar = (): JSX.Element => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />
                <Button variant="text" onClick={onDeleteItems} startIcon={<DeleteIcon />} style={deleteButtonStyle}>Delete</Button>
            </GridToolbarContainer>
        );
    }

    const onSelectionModelChange = (selectedItems: any[]): void => {
        setSelectedItems(selectedItems)
    }

    return <DataGrid
        style={{ height: props.heigth || 700 }}
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