import { ICake } from "../../Utils/Models/ICake";

export interface IDialogProps {
    labels: string[],
    buttonTitle: string,
    onChange: (event: any) => void,
    onSave: (event: any) => void
}