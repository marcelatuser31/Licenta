import { mergeStyles } from "@fluentui/merge-styles";
import { getAriaDescribedBy, merge } from "@fluentui/react";
import { DEFAULT_COLOR } from "../../Utils/constants";

export const title: string = mergeStyles({
    fontSize: "50px",
    fontWeight: 800,
    textalign: 'left',
    color: 'black',
    position: "relative",
    top: "30px",
    fontFamily: 'Brush Script MT'
    // textShadow: "3px 3px"

})
export const price1: string = mergeStyles({
    fontSize: "20px",
    position: "relative",
    top: "30px",
    fontWeight: 600,
    color: "Black",
    left: 30
})

export const price2: string = mergeStyles({
    fontSize: "20px",
    position: "relative",
    top: "30px",
    fontWeight: 600,
    color: DEFAULT_COLOR
})

export const image: string = mergeStyles({
    position: "relative",
    top: "30px",
    left: "30px",
    selectors: {
        ":hover": {
            WebkitFontSmoothing: "scale(1.1) slow",
            transform: "scale(1.05)",
            cursor: 'pointer'
        }
    }

    // transform: "scale(1.3)"

})

export const textField: string = mergeStyles({
    width: '50px'


})