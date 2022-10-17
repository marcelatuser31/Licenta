import { mergeStyles } from "@fluentui/merge-styles";
import { relative } from "path";
import React from "react";

export const buttonStyle: string = mergeStyles({
    marginLeft: "210px",
    position: "relative",
    marginTop: "12px"
})

export const menuStyle: string = mergeStyles({
    right: "600px",
    position: 'relative',
    top: 1
})

export const filterButtonStyle: React.CSSProperties = {
    position: "relative",
    top: "2.5px",
    borderColor: "rgb(29,29,29)",
    backgroundColor: "rgb(29, 29, 29)",
    color: "rgb(240,240,240)",
    fontWeight: "bolder",
    outline: "none"
}

