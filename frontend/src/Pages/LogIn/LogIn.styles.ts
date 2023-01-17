import { SxProps, Theme } from "@mui/material";
import { DEFAULT_COLOR, DEFAULT_FONT } from "../../Utils/constants";
import { LOGIN_BACKGROUND } from "../../Utils/images";

export const logInLabelStyle: SxProps<Theme> = {
    fontSize: "1.6vw",
    fontWeight: 600,
    color: DEFAULT_COLOR,
    fontFamily: DEFAULT_FONT
}

export const backgroundStyle: SxProps<Theme> = {
    backgroundImage: LOGIN_BACKGROUND,
    backgroundRepeat: 'no-repeat',
    backgroundColor: (t) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}

export const textFieldBoxStyle: React.CSSProperties = {
    width: "20vw"
}

export const logInButtonStyle: SxProps<Theme> = {
    mt: 3,
    mb: 2,
    fontFamily: "Georgia"
}

export const buttonStyle: React.CSSProperties = {
    fontFamily: DEFAULT_FONT,
    fontWeight: "200",
    fontSize: "0.8vw"
}