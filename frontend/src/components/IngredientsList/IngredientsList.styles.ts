import { SxProps, Theme } from "@mui/material";
import { DEFAULT_FONT } from "../../Utils/constants";

export const paperStyle: SxProps<Theme> = {
    width: 200,
    height: 230,
    overflow: 'auto'
}

export const buttonStyle: SxProps<Theme> = {
    my: 0.5
}

export const availableIngredientsLabel: React.CSSProperties = {
    fontFamily: DEFAULT_FONT,
    fontSize: "15px",
    position: "relative",
    left: "15px"
}

export const selectedIngredientsLabel: React.CSSProperties = {
    fontFamily: DEFAULT_FONT,
    fontSize: "15px",
    position: "relative",
    left: "320px",
    width: "160px",
    top: "-246.5px"
}