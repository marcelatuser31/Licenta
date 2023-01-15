import { mergeStyles } from "@fluentui/merge-styles";
import { DEFAULT_COLOR } from "../../Utils/constants";

export const descriptionStyle: string = mergeStyles({
    width: "45vw",
    fontFamily: "Georgia",
    fontSize: "1.65vw",
    position: "relative",
    left: 40,
    textAlign: "center"
})

export const aboutUsContentStyle: string = mergeStyles({
    position: "relative",
    top: "40px",
    fontWeight: 600,
    color: "Black",
    left: 100,
    width: 1200
})

export const sectionLabelStyle: string = mergeStyles({
    fontSize: "2.5vw",
    position: "relative",
    top: "30px",
    left: 80,
    fontWeight: 600,
    color: DEFAULT_COLOR,
    width: 1200,
    fontFamily: 'Georgia',
})

export const carouselContentStyle: React.CSSProperties = {
    height: '30vw',
    color: '#fff',
    lineHeight: '30vw',
    textAlign: 'center',
    background: '#364d79',
    width: '30vw',
    borderRadius: "10%"
}

export const carouselStyle: React.CSSProperties = {
    width: "30vw",
    height: "30vw",
    borderRadius: "10%"
}