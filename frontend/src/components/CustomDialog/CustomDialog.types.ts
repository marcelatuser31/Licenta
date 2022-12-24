export interface IDialogComponentProps {
    openDialog: boolean;
    content?: JSX.Element,
    title?: string,
    onSubmit?: () => void;
    onClose: () => void;
    addButton?: boolean;
    width?: number;
    height?: number;
}