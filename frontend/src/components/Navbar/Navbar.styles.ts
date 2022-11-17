import { mergeStyles } from "@fluentui/merge-styles";
import { SxProps, Theme } from "@mui/material";
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

export const expandedCakeIconStyle: SxProps<Theme> = {
    display: { xs: 'none', md: 'flex' }, mr: 1
}

export const expandedLogoStyle: SxProps<Theme> = {
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
}

export const cakeIconStyle: SxProps<Theme> = {
    display: { xs: 'flex', md: 'none' }, mr: 1
}

export const logoStyle: SxProps<Theme> = {
    mr: 2,
    display: { xs: 'flex', md: 'none' },
    flexGrow: 1,
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
}

export const expandedMenuBoxStyles: SxProps<Theme> = {
    flexGrow: 1, display: { xs: 'flex', md: 'none' }
}

export const menuBoxStyles: SxProps<Theme> = {
    flexGrow: 1, display: {
        xs: 'none', md: 'flex'
    }
}

export const settingsBoxStyles: SxProps<Theme> =
    { flexGrow: 0, float: "right" }

export const containerStyles: React.CSSProperties = {
    marginLeft: 0, maxWidth: 2000
}