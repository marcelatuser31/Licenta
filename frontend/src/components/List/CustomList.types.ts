import { BaseButton, IIconProps } from "@fluentui/react";

export interface ICustomListProps {
    items: any[];
    columns: any[];
    setSelectedItems?: (items: string[]) => void;
    onDeleteItems?: (items: any[]) => void;
    heigth?: number;
    width?: number;
    groupByColumn?: string;
    showManageButtons?: boolean;
    onManage?: any;
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