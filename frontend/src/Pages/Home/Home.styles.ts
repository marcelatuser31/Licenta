import { mergeStyles } from "@fluentui/merge-styles";
import { DEFAULT_COLOR } from "../../Utils/constants";

export const cakesContainerStyle: string = mergeStyles({
    display: "grid",
    gap: "100px",
    gridTemplateColumns: "repeat(4, 1fr)",
    position: 'relative',
    left: 60,
    top: 30
})

export const choiceGroupStyle: string = mergeStyles({
    position: 'relative',
    left: 60,
    top: 20
})

export const selectedMenuStyle: string = mergeStyles({
    position: 'relative',
    width: "100%"
})

export const labelSectionStyle: string = mergeStyles({
    position: 'relative',
    left: 30,
    fontSize: "20px",
    top: 30,
    fontWeight: 600,
    color: DEFAULT_COLOR
})