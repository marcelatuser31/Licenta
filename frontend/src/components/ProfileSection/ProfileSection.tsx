import { Stack, StackItem } from "@fluentui/react"
import { TextField } from "@mui/material"
import { labelStyle, valueStyle } from "../../Pages/Profile/Profile.styles"
import { textFieldStyles } from "./ProfileSection.styles"
import { IProfileSectionProps } from "./ProfileSection.types"

export const ProfileSection = (props: IProfileSectionProps): JSX.Element => {
    return <StackItem>
        <Stack horizontal={true} gap='10'>
            <StackItem className={labelStyle}>
                {props.name}
            </StackItem>
            <StackItem className={valueStyle}>
                <TextField value={props.contentValue} className={textFieldStyles} style={{ height: 100 }}></TextField>
            </StackItem>
        </Stack>
    </StackItem>
}