export interface IDialogComponentProps {
    openDialog: boolean;
    content?: JSX.Element,
    title?: string,
    onSubmit?: () => void;
    onClose: () => void;
    addButton?: boolean;
    width?: number | string;
    height?: number | string;
    submitButtonLabel?: string;
}