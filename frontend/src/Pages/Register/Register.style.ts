import { SxProps, Theme } from "@mui/material";
import { DEFAULT_COLOR, DEFAULT_FONT } from "../../Utils/constants";
import { REGISTER_BACKGROUND } from "../../Utils/images";

export const backgroundStyle: SxProps<Theme> = {
    backgroundImage: REGISTER_BACKGROUND,
    backgroundRepeat: 'no-repeat',
    backgroundColor: (t) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}

export const signUpBoxStyle: SxProps<Theme> = {
    margin: "6vw",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}

export const textfieldBoxStyle: SxProps<Theme> = {
    mt: 3,
    width: "20vw"
}

export const signUpButtonStyle: SxProps<Theme> = {
    mt: 3,
    mb: 2,
    fontFamily: DEFAULT_FONT
}

export const signUpLabelStyle: SxProps<Theme> = {
    fontSize: "1.8vw",
    fontWeight: 600,
    color: DEFAULT_COLOR,
    fontFamily: DEFAULT_FONT
}

export const logInBoxStyle: SxProps<Theme> = {
    my: 8,
    mx: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: "12vw"
}