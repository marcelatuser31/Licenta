import { BaseButton, IIconProps } from "@fluentui/react";

export interface ICustomListProps {
    items: any[];
    columns: any[];
    setSelectedItems?: (items: any[]) => void;
    onDeleteItems?: (items: any[]) => void;
    heigth?: number
    groupByColumn?: string;
}

export interface IActionButtonProps<T> {
    text: string;
    iconProps: IIconProps;
    disabled: boolean;
    requireSelectedItem: boolean;
    requireMultipleSelections: boolean;
    onClick: (event: React.MouseEvent<HTMLElement | BaseButton>, items: T[]) => void;
}