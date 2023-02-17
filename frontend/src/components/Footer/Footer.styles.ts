import { mergeStyles } from "@fluentui/merge-styles";
import { DEFAULT_COLOR, DEFAULT_FONT } from "../../Utils/constants";

export const footerStyle: string = mergeStyles({
    marginTop: "6rem",
    padding: "2.5%",
    backgroundColor: DEFAULT_COLOR,
    position: "relative",
    width: "95%",
    display: "flex",
    justifyContent: "space-around",
})

export const iconStyle: string = mergeStyles({
    color: "Black"
})

export const textStyle: string = mergeStyles({
    fontSize: "1.1vw",
    fontWeight: 600,
    color: "White",
    fontFamily: DEFAULT_FONT,
    width: 350
})

export const contactUsStyle: string = mergeStyles({
    position: "relative",
    top: 35
})