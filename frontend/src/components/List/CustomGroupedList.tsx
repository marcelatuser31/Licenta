import { Button } from "@mui/material";
import { DataGridPremium, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, useGridApiRef, useKeepGroupedColumnsHidden } from "@mui/x-data-grid-premium"
import { GridApiPremium } from "@mui/x-data-grid-premium/models/gridApiPremium";
import { MutableRefObject, useState } from "react";
import { deleteButtonStyle } from "./CustomList.styles";
import { ICustomListProps } from "./CustomList.types"
import DeleteIcon from '@mui/icons-material/Delete';

export const CustomGroupedList = (props: ICustomListProps): JSX.Element => {
    const [items, setItems] = useState<any[]>(props.items);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

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
        },
    });

    const onSelectionModelChange = (selectedItems: any[]): void => {
        setSelectedItems(selectedItems)
    }

    return <DataGridPremium
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
}