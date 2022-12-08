import { BaseButton, IIconProps } from "@fluentui/react";

export interface ICustomListProps {
    items: any[];
    columns: any[];
    setSelectedItems?: (items: any[]) => void;
    onDeleteItems?: (items: any[]) => void;
    heigth?: number;
    width?: number;
    groupByColumn?: string;
    addButton?: boolean
    dialogContent?: JSX.Element
    dialogTitle?: string
    onSave?: () => void;
}

export interface IActionButtonProps<T> {
    text: string;
    iconProps: IIconProps;
    disabled: boolean;
    requireSelectedItem: boolean;
    requireMultipleSelections: boolean;
    onClick: (event: React.MouseEvent<HTMLElement | BaseButton>, items: T[]) => void;
}