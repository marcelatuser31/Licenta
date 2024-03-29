export interface ICustomDropdownProps {
    options: string[],
    setDefaultValue: (event: string) => void,
    defaultValue: string,
    onSelectItem?: () => void,
    name: string
}