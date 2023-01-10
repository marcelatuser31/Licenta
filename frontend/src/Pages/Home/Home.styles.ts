import { mergeStyles } from "@fluentui/merge-styles";
import { DEFAULT_COLOR } from "../../Utils/constants";

export const descriptionStyle: string = mergeStyles({
    width: "45vw",
    fontFamily: 'Brush Script MT',
    fontSize: "1.75vw",
    position: "relative",
    left: 50,
    textAlign: "center"
})

export const aboutUsContentStyle: string = mergeStyles({
    position: "relative",
    top: "50px",
    fontWeight: 600,
    color: "Black",
    left: 100,
    width: 1200
})

export const aboutUsLabelStyle: string = mergeStyles({
    fontSize: "3.5vw",
    position: "relative",
    top: "30px",
    left: 80,
    fontWeight: 600,
    color: DEFAULT_COLOR,
    width: 1200,
    fontFamily: 'Brush Script MT',
})