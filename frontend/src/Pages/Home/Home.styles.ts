import { mergeStyles } from "@fluentui/merge-styles";
import { DEFAULT_COLOR } from "../../Utils/constants";

export const cakesContainerStyles: string = mergeStyles({
    display: "grid",
    gap: "100px",
    gridTemplateColumns: "repeat(4, 1fr)",
    position: 'relative',
    left: 60,
    top: 30
})

export const choiceGroupStyles: string = mergeStyles({
    position: 'relative',
    left: 60,
    top: 20
})

export const selectedMenuStyles: string = mergeStyles({
    position: 'relative',
    width: "100%"
})

export const labelSectionStyles: string = mergeStyles({
    position: 'relative',
    left: 30,
    fontSize: "20px",
    top: 30,
    fontWeight: 600,
    color: DEFAULT_COLOR
})