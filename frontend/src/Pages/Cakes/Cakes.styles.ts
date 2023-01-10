import { mergeStyles } from "@fluentui/merge-styles";
import { DEFAULT_COLOR } from "../../Utils/constants";

export const itemsContainerStyle: string = mergeStyles({
    display: "flex",
    flexWrap: "wrap",
    width: "75vw",
    gap: "40px",
    position: 'relative',
    top: 30,
    justifyContent: "space-around"
})

export const choiceGroupStyle: string = mergeStyles({
    position: 'relative',
    left: 60,
    top: 20
})

export const selectedMenuStyle: string = mergeStyles({
    position: 'relative',
    width: "100%",
    top: 5
})

export const labelSectionStyle: string = mergeStyles({
    position: 'relative',
    left: 30,
    fontSize: "18px",
    top: 30,
    fontWeight: 600,
    width: 120,
    color: DEFAULT_COLOR,
})

export const dividerStyle: string = mergeStyles({
    display: "inline-block",
    borderLeft: "4px solid #ccc",
    height: "3000",
    weight: "10px",
    position: "relative",
    top: 20,
    left: 50,
})