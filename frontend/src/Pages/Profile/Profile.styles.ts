import { mergeStyles } from "@fluentui/merge-styles";
import { SxProps, Theme } from "@mui/material";
import { DEFAULT_COLOR, DEFAULT_FONT } from "../../Utils/constants";

export const photoStackStyle: string = mergeStyles({
    position: "relative",
    top: "50px",
    left: "50px",
})

export const sectionTitleStyle: string = mergeStyles({
    fontSize: "45px",
    fontWeight: 600,
    textalign: 'left',
    color: 'black',
    position: "relative",
    fontFamily: DEFAULT_FONT,
})

export const informationStackStyle: string = mergeStyles({
    position: 'relative',
    top: "30px"
})

export const labelStyle: string = mergeStyles({
    fontFamily: DEFAULT_FONT,
    fontSize: "25px",
    color: DEFAULT_COLOR,
    width: "140px",
    position: "relative",
    top: "12px"
})

export const valueStyle: string = mergeStyles({
    fontFamily: DEFAULT_FONT,
    fontSize: "20px",
    fontWeight: 800
})

export const textFieldStyle: string = mergeStyles({
    height: 10
})

export const saveButtonStyle: SxProps<Theme> = {
    mt: 3,
    mb: 2,
    width: 150,
    top: "-40px",
    left: "30px"
}