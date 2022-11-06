import { mergeStyles } from "@fluentui/merge-styles";
import { CSSProperties } from "@mui/styled-engine";

export const listStyle: string = mergeStyles({
    position: 'relative',
    left: 50,
    top: 50,
    width: 600
})

export const boxStyle: CSSProperties = {
    height: '700px',
    width: '65%'
}

export const outerDiv: string = mergeStyles({
    width: '100%',
    textAlign: 'center'
})

export const innerDiv: string = mergeStyles({
    dispaly: "inline-block",
    margin: "0 auto"
})

export const addOrderButtonStyle: string = mergeStyles({
    position: 'relative',
    width: 200,
    top: 60
})