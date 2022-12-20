import { Button, Checkbox, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { IIngredient } from "../../Utils/Models/IIngredient";
import { IngredientRoutes } from "../../Utils/Routes/backEndRoutes";
import { IIngredientsList } from "./IngredientaList.types";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

export const IngredientsList = (props: IIngredientsList): JSX.Element => {
    const [checked, setChecked] = React.useState<IIngredient[]>([])
    const [right, setRight] = React.useState<IIngredient[]>([]);
    const [left, setLeft] = React.useState<IIngredient[]>([]);

    const not = (a: IIngredient[], b: IIngredient[]): IIngredient[] => {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    const intersection = (a: IIngredient[], b: IIngredient[]): IIngredient[] => {
        return a.filter((value) => b.indexOf(value) !== -1);
    }

    useEffect(() => {
        const getIngredients = async (): Promise<void> => {
            const response = await axios.get(IngredientRoutes.GetAll)
            setLeft(response.data)
        }
        getIngredients()
    }, [props.isAdded])

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (ingredient: IIngredient) => () => {
        const currentIndex = checked.indexOf(ingredient);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(ingredient);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    useEffect(() => {
        props.setIngredients(right)
    }, [right])

    const onAddIngredient = (): void => {
        props.setAddIngredient(true)
    }

    const customList = (items: IIngredient[]) => (
        <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((ingredient: IIngredient) => {
                    const labelId = ingredient.id;

                    return (
                        <ListItem
                            key={ingredient.id}
                            role="listitem"
                            button
                            onClick={handleToggle(ingredient)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(ingredient) !== -1}
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
                })}{items === left &&
                    <ListItem>
                        <IconButton onClick={onAddIngredient}>
                            <AddCircleTwoToneIcon />
                        </IconButton></ListItem>
                }
            </List>
        </Paper>
    );

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>{customList(left)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(right)}</Grid>
        </Grid>
    );
}