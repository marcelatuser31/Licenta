import { Button, Checkbox, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { IIngredient } from "../../Utils/Models/IIngredient";
import { IngredientRoutes } from "../../Utils/Routes/backEndRoutes";
import { IIngredientsListProps } from "./IngredientaList.types";
import AddIcon from '@mui/icons-material/Add';
import { buttonStyle, paperStyle } from "./IngredientsList.styles";

export const IngredientsList = (props: IIngredientsListProps): JSX.Element => {
    const [checkedIngredients, setCheckedIngredients] = React.useState<IIngredient[]>(props.availableIngredients ? props.availableIngredients : [])
    const [selectedIngredients, setSelectedIngredients] = React.useState<IIngredient[]>(props.selectedIngredients ? props.selectedIngredients : []);
    const [availableIngredients, setAvailableIngredients] = React.useState<IIngredient[]>([]);

    useEffect(() => {
        props.setIngredients(selectedIngredients)
    }, [selectedIngredients])

    useEffect(() => {

        if (props.selectedIngredients)
            setAvailableIngredients(props.selectedIngredients);

        if (props.availableIngredients)
            setAvailableIngredients(props.availableIngredients);

    }, []);

    useEffect(() => {
        const getIngredients = async (): Promise<void> => {
            const response = await axios.get(IngredientRoutes.GetAll)
            setAvailableIngredients(response.data)
        }
        getIngredients()
    }, [props.isAdded])

    const getRemainingIngredients = (a: IIngredient[], b: IIngredient[]): IIngredient[] => {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    const getIntersection = (a: IIngredient[], b: IIngredient[]): IIngredient[] => {
        return a.filter((value) => b.indexOf(value) !== -1);
    }

    const leftChecked: IIngredient[] = getIntersection(checkedIngredients, availableIngredients);
    const rightChecked: IIngredient[] = getIntersection(checkedIngredients, selectedIngredients);

    const onToggleIngredient = (ingredient: IIngredient) => (): void => {
        const ingredientIndex: number = checkedIngredients.indexOf(ingredient);
        const newChecked: IIngredient[] = [...checkedIngredients];

        if (ingredientIndex === -1) {
            newChecked.push(ingredient);
        } else {
            newChecked.splice(ingredientIndex, 1);
        }
        setCheckedIngredients(newChecked);
    };

    const onSelectAll = (): void => {
        setSelectedIngredients(selectedIngredients.concat(availableIngredients));
        setAvailableIngredients([]);
    };

    const onSelectIngredients = (): void => {
        setSelectedIngredients(selectedIngredients.concat(leftChecked));
        setAvailableIngredients(getRemainingIngredients(availableIngredients, leftChecked));
        setCheckedIngredients(getRemainingIngredients(checkedIngredients, leftChecked));
    };

    const onRemoveIngredients = (): void => {
        setAvailableIngredients(availableIngredients.concat(rightChecked));
        setSelectedIngredients(getRemainingIngredients(selectedIngredients, rightChecked));
        setCheckedIngredients(getRemainingIngredients(checkedIngredients, rightChecked));
    };

    const onRemoveAll = (): void => {
        setAvailableIngredients(availableIngredients.concat(selectedIngredients));
        setSelectedIngredients([]);
    };

    const onAddIngredient = (): void => {
        props.setShouldDisplayNewIngredient(true)
    }

    const customList = (items: IIngredient[]): JSX.Element => (
        <Paper sx={paperStyle}>
            <List dense component="div" role="list">
                {items.map((ingredient: IIngredient) => {
                    const labelId = ingredient.id;

                    return (
                        <ListItem
                            key={ingredient.id}
                            role="listitem"
                            button
                            onClick={onToggleIngredient(ingredient)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checkedIngredients.indexOf(ingredient) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={ingredient.name} />
                        </ListItem>
                    );
                })}{items === availableIngredients &&
                    <ListItem>
                        <IconButton onClick={onAddIngredient}>
                            <AddIcon />
                        </IconButton></ListItem>
                }
            </List>
        </Paper>
    );

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>{customList(availableIngredients)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={buttonStyle}
                        variant="outlined"
                        size="small"
                        onClick={onSelectAll}
                        disabled={availableIngredients.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        sx={buttonStyle}
                        variant="outlined"
                        size="small"
                        onClick={onSelectIngredients}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={buttonStyle}
                        variant="outlined"
                        size="small"
                        onClick={onRemoveIngredients}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        sx={buttonStyle}
                        variant="outlined"
                        size="small"
                        onClick={onRemoveAll}
                        disabled={selectedIngredients.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(selectedIngredients)}</Grid>
        </Grid>
    );
}