import { mergeStyles } from "@fluentui/merge-styles";
import { alpha, SxProps, Theme } from "@mui/material";
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
    cursor: "pointer"
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
    cursor: "pointer"
}

export const expandedMenuBoxStyle: SxProps<Theme> = {
    flexGrow: 1, display: { xs: 'flex', md: 'none' }
}

export const menuBoxStyle: SxProps<Theme> = {
    flexGrow: 1,
    display: { xs: 'none', md: 'flex' }
}

export const settingsBoxStyle: SxProps<Theme> = {
    flexGrow: 0,
    float: "right"
}

export const containerStyle: React.CSSProperties = {
    marginLeft: 0,
    maxWidth: 2000
}

export const pageButtonStyle: SxProps<Theme> = {
    my: 2,
    color: 'white',
    display: 'block'
}

export const searchStyle = (theme: any): any => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(5),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
});

export const searchIconStyle = (theme: any): any => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})

export const searchComponentStyle = (theme: any): any => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    }
})