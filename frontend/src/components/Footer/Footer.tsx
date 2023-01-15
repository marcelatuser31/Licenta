import { contactUsStyle, footerStyle, iconStyle, textStyle } from "./Footer.styles"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Stack } from "@fluentui/react";
import { StoreMap } from "../StoreMap/StoreMap";
import { Section } from "../Section/Section";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LanguageIcon from '@mui/icons-material/Language';

export const Footer = (): JSX.Element => {
    const getSection = (icon: JSX.Element, name: string) => {
        return <Section name={icon} contentValue={name} labelStyle={iconStyle} valueStyle={textStyle} isHorizontal={true} gap={15}></Section>
    }

    return <div className={footerStyle}>
        <Stack>
            <StoreMap />
        </Stack>
        <Stack gap={25} className={contactUsStyle}>
            {getSection(<LocationOnIcon />, "Aleea Marin Preda, Cluj-Napoca")}
            {getSection(<LocalPhoneIcon />, "0264 652 831")}
            {getSection(<EmailIcon />, "sweet@yahoo.com")}
            {getSection(<LanguageIcon />, "www.sweet.com")}
        </Stack>
        <Stack gap={25} className={contactUsStyle}>
            {getSection(<div onClick={() => window.location.replace("https://www.facebook.com/")}><FacebookIcon /></div>, "Facebook")}
            {getSection(<div onClick={() => window.location.replace("https://www.instagram.com/")}><InstagramIcon /></div>, "Instagram")}
            {getSection(<div onClick={() => window.location.replace("https://www.youtube.com")}><YouTubeIcon /></div>, "YouTube")}
            {getSection(<div onClick={() => window.location.replace("https://www.twitter.com")}><TwitterIcon /></div>, "Twitter")}
        </Stack>
    </div >
}