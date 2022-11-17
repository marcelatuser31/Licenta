import { mergeStyles } from "@fluentui/merge-styles";
import { SxProps, Theme } from "@mui/material";

export const ingredientsNameStyles: string = mergeStyles({
    fontWeight: 'bold'
});

export const customCardStyles: string = mergeStyles({
    margin: "15px",
    width: "300px"
})

export const cardStyles: SxProps<Theme> = {
    maxWidth: 345,
    minHeight: 500
}