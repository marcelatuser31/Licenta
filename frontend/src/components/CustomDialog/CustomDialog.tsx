import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";
import { IDialogProps } from "./CustomDialog.types";

export const CustomDialog = (props: IDialogProps): JSX.Element => {
    const [open, setOpen] = React.useState(false);

    const onOpenDialog = () => {
        setOpen(true);
    };

    const onCloseDialog = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={onOpenDialog}>
                {props.buttonTitle}
            </Button>
            <Dialog open={open} onClose={onCloseDialog}>
                <DialogTitle>{props.buttonTitle}</DialogTitle>
                <DialogContent>
                    {props.labels.map((label: string) =>
                        <TextField
                            autoFocus
                            margin="dense"
                            id={label}
                            label={label}
                            fullWidth
                            variant="standard"
                            name={label}
                            onChange={props.onChange}
                            type={label === 'Name' ? 'text' : 'Number'}
                        />)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseDialog}>Cancel</Button>
                    <Button onClick={props.onSave}>SAVE</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}