import { mergeStyles } from "@fluentui/merge-styles";
import React from "react";

export const logOutButtonStyle: string = mergeStyles({
    position: "relative",
    top: "5px",
    left: 160
})

export const myCartButtonStyle: string = mergeStyles({
    position: "relative",
    top: 5,
    left: -20,
    cursor: "pointer"
})

export const menuStyle: string = mergeStyles({
    position: 'relative',
    top: 1,
    left: 60
})

export const filterButtonStyle: React.CSSProperties = {
    position: "relative",
    top: "2.5px",
    borderColor: "rgb(29,29,29)",
    backgroundColor: "rgb(29, 29, 29)",
    color: "rgb(240,240,240)",
    fontWeight: "bolder",
    outline: "none",
    padding: "0.5rem 1rem"
}

export const imageStyle: string = mergeStyles({
    borderRadius: "50%"
})