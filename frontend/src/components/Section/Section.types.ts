export interface ISectionProps {
    name: string | JSX.Element,
    contentValue: JSX.Element | string,
    isHorizontal?: boolean,
    gap?: number,
    labelStyle?: string,
    valueStyle?: string
}