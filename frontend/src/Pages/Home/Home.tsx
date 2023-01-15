import { Navbar } from "../../components/Navbar/Navbar"
import { Carousel } from 'antd';
import { Stack, StackItem } from "@fluentui/react";
import { ABOUT_US_P2, ABOUT_US_P3, ABOUT_US_P4, ABOUT_US_P5 } from "../../Utils/constants";
import { ABOUT_US_P1 } from "../../Utils/constants";
import { Section } from "../../components/Section/Section";
import { aboutUsContentStyle, sectionLabelStyle, descriptionStyle, carouselContentStyle, carouselStyle } from "./Home.styles";
import { Footer } from "../../components/Footer/Footer"
import { CAROUSEL_IMAGE_1, CAROUSEL_IMAGE_10, CAROUSEL_IMAGE_2, CAROUSEL_IMAGE_3, CAROUSEL_IMAGE_4, CAROUSEL_IMAGE_5, CAROUSEL_IMAGE_6, CAROUSEL_IMAGE_7, CAROUSEL_IMAGE_8, CAROUSEL_IMAGE_9 } from "../../Utils/images";

export const carouselImages: string[] = [CAROUSEL_IMAGE_1, CAROUSEL_IMAGE_2, CAROUSEL_IMAGE_3, CAROUSEL_IMAGE_4, CAROUSEL_IMAGE_5, CAROUSEL_IMAGE_6, CAROUSEL_IMAGE_7, CAROUSEL_IMAGE_8, CAROUSEL_IMAGE_9, CAROUSEL_IMAGE_10]
export const aboutUsDescriprion: string[] = [ABOUT_US_P1, ABOUT_US_P3, ABOUT_US_P5]

export const Home = (): JSX.Element => {
    const getAboutUsContent = (): JSX.Element => {
        return <Stack horizontal={true} gap={150}>
            <StackItem>
                {aboutUsDescriprion.map((paragraph: string) =>
                    <p className={descriptionStyle}>{paragraph}</p>
                )}
            </StackItem>
            <StackItem >
                <Carousel autoplay style={carouselStyle}>
                    {carouselImages.map((image: string) =>
                        <div>
                            <img src={image} style={carouselContentStyle}></img>
                        </div>
                    )}
                </Carousel>
            </StackItem>
        </Stack>
    }

    return <div>
        <Navbar></Navbar>
        <Stack gap={100}>
            <Section name={"About us"} contentValue={getAboutUsContent()} valueStyle={aboutUsContentStyle} labelStyle={sectionLabelStyle}></Section>
            <Footer />
        </Stack>
    </div>
}