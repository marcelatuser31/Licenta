import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { ADD_MESSAGE, SUCCESSFULLY } from "../../Utils/constants";
import { SweetAlertIcon } from "../../Utils/enums";
import { getMessage } from "../../Utils/methods";
import { IDialogComponentProps } from "./CustomDialog.types";

export const CustomDialog = (props: IDialogComponentProps): JSX.Element => {

    const closeDialog = (): void => {
        props.onClose();
    };

    const Add = (): void => {
        props.onSubmit();
        props.onClose();
    };

    return (<Dialog open={props.openDialog} onClose={closeDialog} >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent style={{ width: "450px", }} >
            {props.content}
        </DialogContent>
        <DialogActions>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button onClick={Add}>Add</Button>
        </DialogActions>
    </Dialog>)
}