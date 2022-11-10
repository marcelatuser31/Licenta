export interface ISectionProps {
    name: string,
    contentValue: JSX.Element | string,
    isHorizontal?: boolean,
    gap?: number,
    labelStyle?: string,
    valueStyle?: string
}