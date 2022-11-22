import axios from 'axios';
import { Buffer } from 'buffer';
import { title } from 'process';
import Swal, { SweetAlertIcon } from "sweetalert2";
import { DEFAULT_COLOR, IMAGE_HEADERS } from './constants';
import { CakeRoutes, PersonRoutes } from './Routes/backEndRoutes';

export interface IMessage {
    icon: SweetAlertIcon,
    title: string,
    text: string
}

export const getMessage = (props: IMessage): void => {
    Swal.fire({
        icon: props.icon,
        title: props.title,
        text: props.text,
        confirmButtonColor: DEFAULT_COLOR
    })
}

export const getImageURLfromByteArray = (byteArray: any): string => {
    if (byteArray == null)
        return "";

    const byteCharacters = atob(byteArray);
    const byteNumbers = new Array(byteCharacters.length)

    for (let i = 0; i <= byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
    }

    const byteArray1: Uint8Array = new Uint8Array(byteNumbers)
    const image: Blob = new Blob([byteArray1], { type: "image/jpeg" })
    return URL.createObjectURL(image)
}

export const onUploadPhoto = (event: any, cakeId: string): void => {
    const formdata: FormData = new FormData()
    formdata.append('image', event.target.files[0])
    formdata.append('cakeId', cakeId)
    const getData = async (): Promise<void> => {
        const response = await axios.post(CakeRoutes.AddImage, formdata, { headers: IMAGE_HEADERS })
    }
    getData()
}

export const onUploadProfilePhoto = (event: any, personId: string): void => {
    const formdata: FormData = new FormData()
    formdata.append('image', event.target.files[0])
    formdata.append('personId', personId)
    const getData = async (): Promise<void> => {
        const response = await axios.post(PersonRoutes.AddImage, formdata, { headers: IMAGE_HEADERS })
    }
    getData()
}