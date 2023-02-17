import { mergeStyles } from "@fluentui/merge-styles";
import { CSSProperties } from "@mui/styled-engine";
import { DEFAULT_COLOR } from "../../Utils/constants";

export const listStyle: string = mergeStyles({
    position: 'relative',
    left: 50,
    top: 50,
    width: 600
})

export const boxStyle: CSSProperties = {
    height: '700px',
    width: '80%'
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
    top: 25,
    align: 'center',
    left: 400
})

export const deleteButtonStyle: React.CSSProperties = {
    fontSize: "0.8125rem"
}

export const labelStyle: string = mergeStyles({
    fontSize: "20px",
    position: "relative",
    top: "30px",
    fontWeight: 600,
    color: DEFAULT_COLOR,
    width: 200
})

export const valueStyle: string = mergeStyles({
    fontSize: "20px",
    position: "relative",
    top: "30px",
    fontWeight: 600,
    color: "Black",
    width: 500
})

export const textFieldStyle: string = mergeStyles({
    position: 'relative',
    top: 10
})