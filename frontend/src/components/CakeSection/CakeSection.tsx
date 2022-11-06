import { Stack, StackItem } from "@fluentui/react"
import { labelStyle, valueStyle } from "../../Pages/Cake/Cake.styles"
import { ICakeSectionProps } from "./CakeSection.types"

export const CakeSection = (props: ICakeSectionProps): JSX.Element => {
    return <StackItem>
        <Stack gap='10'>
            <StackItem className={labelStyle}>
                {props.name}
            </StackItem>
            <StackItem className={valueStyle}>
                {props.contentValue}
            </StackItem>
        </Stack>
    </StackItem>
}