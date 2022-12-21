import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
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
        <DialogContent style={{ width: "550px", height: "1000px" }} >
            {props.content}
        </DialogContent>
        <DialogActions>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={Add}>Add</Button>
        </DialogActions>
    </Dialog>)
}