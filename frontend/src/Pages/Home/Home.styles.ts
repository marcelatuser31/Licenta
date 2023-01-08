import { mergeStyles } from "@fluentui/merge-styles";
import { DEFAULT_COLOR } from "../../Utils/constants";

export const descriptionStyle: string = mergeStyles({
    width: 750,
    fontFamily: 'Brush Script MT',
    fontSize: "23px"
})

export const aboutUsContentStyle: string = mergeStyles({
    position: "relative",
    top: "40px",
    fontWeight: 600,
    color: "Black",
    left: 100,
    width: 1200
})

export const aboutUsLabelStyle: string = mergeStyles({
    fontSize: "30px",
    position: "relative",
    top: "30px",
    left: 50,
    fontWeight: 600,
    color: DEFAULT_COLOR,
    width: 1200
})