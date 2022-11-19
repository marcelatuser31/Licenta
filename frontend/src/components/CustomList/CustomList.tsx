import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { DataGridPremium, useGridApiRef, useKeepGroupedColumnsHidden } from '@mui/x-data-grid-premium';
import { GridApiPremium } from '@mui/x-data-grid-premium/models/gridApiPremium';
import { MutableRefObject, useState } from "react";
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

    const apiRef: MutableRefObject<GridApiPremium> = useGridApiRef();

    const initialState = useKeepGroupedColumnsHidden({
        apiRef,
        initialState: {
            rowGrouping: {
                model: [props.groupByColumn || ""],
            },
            sorting: {
                sortModel: [{ field: '__row_group_by_columns_group__', sort: 'asc' }],
            },
        },
    });

    const getGroupedData = (): any => {
        return {
            columns: props.columns,
            initialState: {},
            rows: items
        };
    };

    return (
        <div>
            {props.groupByColumn
                ? <DataGridPremium
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
                : <DataGrid
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
                />}
        </div>
    );
}