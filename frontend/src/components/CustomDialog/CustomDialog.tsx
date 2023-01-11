import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { dialogContentStyle } from "./CustomDialog.styles";
import { IDialogComponentProps } from "./CustomDialog.types";

export const CustomDialog = (props: IDialogComponentProps): JSX.Element => {

    const Add = (): void => {
        if (props.onSubmit) {
            props.onSubmit();
            props.onClose();
        }
    };

    return (<Dialog open={props.openDialog} onClose={props.onClose} >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent style={dialogContentStyle(props.width, props.height)} >
            {props.content}
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={Add}>{props.submitButtonLabel || "Add"}</Button>
        </DialogActions>
    </Dialog>)
}