export interface ISelectedMenuProps {
    options: string[],
    setDefaultValue: (event: string) => void,
    defaultValue: string,
    onSelectItem: () => void
}