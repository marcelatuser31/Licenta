import { Stack, StackItem } from "@fluentui/react"
import { labelStyle, valueStyle } from "../../Pages/SelectedItem/SelectedCake.styles"
import { ISectionProps } from "./Section.types"

export const Section = (props: ISectionProps): JSX.Element => {
    return <StackItem>
        <Stack gap={props.gap} horizontal={props.isHorizontal}>
            <StackItem className={props.labelStyle || labelStyle}>
                {props.name}
            </StackItem>
            <StackItem className={props.valueStyle || valueStyle}>
                {props.contentValue}
            </StackItem>
        </Stack>
    </StackItem>
}