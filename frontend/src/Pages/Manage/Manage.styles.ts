import { mergeStyles } from "@fluentui/merge-styles";
import { DEFAULT_COLOR, DEFAULT_FONT } from "../../Utils/constants";

export const sectionFieldStyle: string = mergeStyles({
    fontSize: "20px",
    position: "relative",
    fontWeight: 600,
    color: "Black",
    width: 300,
    left: "30px"
})

export const sectionLabelFieldStyle: string = mergeStyles({
    fontSize: "20px",
    position: "relative",
    top: "30px",
    fontWeight: 600,
    color: DEFAULT_COLOR,
    fontFamily: DEFAULT_FONT,
    width: 50
})

export const sectionIngredientsStyle: string = mergeStyles({
    fontSize: "20px",
    position: "relative",
    top: "45px",
    fontWeight: 600,
    color: "Black",
    width: 500,
})

export const sectionLabelTypeStyle: string = mergeStyles({
    fontSize: "20px",
    position: "relative",
    top: "65px",
    fontWeight: 600,
    color: DEFAULT_COLOR,
    fontFamily: DEFAULT_FONT,
    width: 150,
    zIndex: 100
})

export const sectionTypeStyle: string = mergeStyles({
    fontSize: "20px",
    position: "relative",
    top: "60px",
    fontWeight: 600,
    color: "Black",
    width: 450,
    left: "20px"
})

export const sectionLabelUploadPhotoStyle: string = mergeStyles({
    fontSize: "20px",
    position: "relative",
    top: "70px",
    fontWeight: 600,
    color: DEFAULT_COLOR,
    fontFamily: DEFAULT_FONT,
    width: 200
})

export const sectionUploadPhotoStyle: string = mergeStyles({
    fontSize: "20px",
    position: "relative",
    top: "80px",
    fontWeight: 600,
    color: "Black",
    width: 400,
    left: 30,


})