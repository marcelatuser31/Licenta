import { IStyleFunctionOrObject, mergeStyles } from "@fluentui/merge-styles";
import { IChoiceGroupStyleProps, IChoiceGroupStyles } from "@fluentui/react";
import { DEFAULT_COLOR } from "../../Utils/constants";

export const titleStyle: string = mergeStyles({
    fontSize: "50px",
    fontWeight: 800,
    textalign: 'left',
    color: 'black',
    position: "relative",
    top: "30px",
    fontFamily: 'Brush Script MT'
})

export const addToCartStyle: string = mergeStyles({
    width: 200,
    height: 50,
    left: 100
})

export const valueStyle: string = mergeStyles({
    fontSize: "20px",
    position: "relative",
    top: "30px",
    fontWeight: 600,
    color: "Black",
    left: 30,
    width: 100
})

export const labelStyle: string = mergeStyles({
    fontSize: "20px",
    position: "relative",
    top: "30px",
    fontWeight: 600,
    color: DEFAULT_COLOR
})

export const imageStyle: string = mergeStyles({
    position: "relative",
    top: "30px",
    left: "30px",
    borderRadius: "5%",
    selectors: {
        ":hover": {
            WebkitFontSmoothing: "scale(1.1) slow",
            transform: "scale(1.05)",
            cursor: 'pointer'
        }
    }
})

export const textFieldStyle: string = mergeStyles({
    width: '50px',
    position: 'relative',
    top: -5
})

export const choiceGroupStyle: IStyleFunctionOrObject<IChoiceGroupStyleProps, IChoiceGroupStyles> = {
    flexContainer:
        { display: "flex" }
}