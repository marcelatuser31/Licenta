import { mergeStyles } from "@fluentui/merge-styles";

export const cakesContainerStyles: string = mergeStyles({
    display: "grid",
    gap: "1px",
    gridTemplateColumns: "repeat(4, 1fr)",
    margin: "100px"
})