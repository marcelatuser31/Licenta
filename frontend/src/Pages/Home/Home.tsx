import { StoreMap } from "../../components/StoreMap/StoreMap"
import { Navbar } from "../../components/Navbar/Navbar"
import React from 'react';
import { Carousel } from 'antd';
import { Stack, StackItem } from "@fluentui/react";

import { ABOUT_US_P2, ABOUT_US_P3, ABOUT_US_P4, ABOUT_US_P5, CAROUSEL_IMAGE_1, CAROUSEL_IMAGE_10, CAROUSEL_IMAGE_2, CAROUSEL_IMAGE_3, CAROUSEL_IMAGE_4, CAROUSEL_IMAGE_5, CAROUSEL_IMAGE_6, CAROUSEL_IMAGE_7, CAROUSEL_IMAGE_8, CAROUSEL_IMAGE_9 } from "../../Utils/constants";
import { ABOUT_US_P1 } from "../../Utils/constants";
import { Section } from "../../components/Section/Section";
import { aboutUsContentStyle, aboutUsLabelStyle, descriptionStyle } from "./Home.styles";

export const carouselImages: string[] = [CAROUSEL_IMAGE_1, CAROUSEL_IMAGE_2, CAROUSEL_IMAGE_3, CAROUSEL_IMAGE_4, CAROUSEL_IMAGE_5, CAROUSEL_IMAGE_6, CAROUSEL_IMAGE_7, CAROUSEL_IMAGE_8, CAROUSEL_IMAGE_9, CAROUSEL_IMAGE_10]
export const aboutUsDescriprion: string[] = [ABOUT_US_P1, ABOUT_US_P2, ABOUT_US_P3, ABOUT_US_P4, ABOUT_US_P5]

export const Home = (): JSX.Element => {
    const contentStyle: React.CSSProperties = {
        height: '550px',
        color: '#fff',
        lineHeight: '550px',
        textAlign: 'center',
        background: '#364d79',
        width: '550px',
        borderRadius: "10%"
    };

    const getAboutUsContent = (): JSX.Element => {
        return <Stack horizontal={true} gap={30}>
            <StackItem>
                {aboutUsDescriprion.map((paragraph: string) =>
                    <p className={descriptionStyle}>{paragraph}</p>
                )}
            </StackItem>
            <StackItem >
                <Carousel autoplay style={{ width: 550, height: 550, borderRadius: "10%" }}>
                    {carouselImages.map((image: string) =>
                        <div>
                            <img src={image} style={contentStyle}></img>
                        </div>
                    )}
                </Carousel>
            </StackItem>
        </Stack>
    }

    return <div>
        <Navbar></Navbar>
        <Section name={"About us"} contentValue={getAboutUsContent()} valueStyle={aboutUsContentStyle} labelStyle={aboutUsLabelStyle}></Section>
    </div>
}