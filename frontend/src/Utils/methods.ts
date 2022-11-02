import axios from 'axios';
import { Buffer } from 'buffer';
import Swal from "sweetalert2";
import { IMAGE_HEADERS } from './constants';
import { CakeRoutes } from './Routes/backEndRoutes';

export const errorMessage = (message: string): void => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
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