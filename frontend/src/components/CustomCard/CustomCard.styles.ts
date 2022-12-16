import { mergeStyles } from "@fluentui/merge-styles";
import { SxProps, Theme } from "@mui/material";

export const ingredientsNameStyle: string = mergeStyles({
    fontWeight: 'bold'
});

export const customCardStyle: string = mergeStyles({
    margin: "15px",
    width: "300px"
})

export const cardStyle: SxProps<Theme> = {
    maxWidth: 345,
    minHeight: 500
}

export const avatarStyle: SxProps<Theme> = {
    bgcolor: '#1976d2'
}

export const cardHeaderStyle: React.CSSProperties = {
    textOverflow: 'elipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: 270
}