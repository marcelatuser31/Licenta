import { getPropsWithDefaults, Stack, StackItem } from "@fluentui/react"
import { labelStyle, valueStyle } from "../../Pages/Cake/Cake.styles"
import { ISectionProps } from "./Section.types"

export const Section = (props: ISectionProps): JSX.Element => {
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