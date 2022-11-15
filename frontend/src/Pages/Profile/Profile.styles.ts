import { mergeStyles } from "@fluentui/merge-styles";
import { DEFAULT_COLOR } from "../../Utils/constants";

export const photoStackStyle: string = mergeStyles({
    position: "relative",
    top: "50px",
    left: "50px",
})

export const sectionTitle: string = mergeStyles({
    fontSize: "50px",
    fontWeight: 800,
    textalign: 'left',
    color: 'black',
    position: "relative",
    fontFamily: 'Brush Script MT'
})

export const informationStackStyle: string = mergeStyles({
    position: 'relative',
    top: "30px"
})

export const labelStyle: string = mergeStyles({
    fontFamily: 'Brush Script MT',
    fontSize: "30px",
    color: DEFAULT_COLOR
})

export const valueStyle: string = mergeStyles({
    fontFamily: 'Comic Sans MS',
    fontSize: "25px",
    fontWeight: 800
})

export const textFieldStyles: string = mergeStyles({
    height: 10
})

export const favoriteListStyle: string = mergeStyles({
    maxWidth: 1000,
    maxHeight: 1000
})