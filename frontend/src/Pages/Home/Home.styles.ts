import { IStyleFunctionOrObject, mergeStyles } from "@fluentui/merge-styles";
import { IChoiceGroupStyleProps, IChoiceGroupStyles } from "@fluentui/react";

export const cakesContainerStyles: string = mergeStyles({
    display: "grid",
    gap: "5px",
    gridTemplateColumns: "repeat(4, 1fr)",
    position: 'relative',
    left: 60,
    top: 30
})

export const choiceGroupStyle: IStyleFunctionOrObject<IChoiceGroupStyleProps, IChoiceGroupStyles> = {
    flexContainer: {
        position: 'relative',
        left: 60,
        top: 100
    }

}