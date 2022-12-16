import axios from 'axios';
import Swal, { SweetAlertResult } from "sweetalert2";
import { CANCEL, DEFAULT_COLOR, IMAGE_HEADERS, NO, OK, YES } from './constants';
import { SweetAlertIcon } from './enums';

export const getMessage = (icon: SweetAlertIcon, title: string, message: string, onConfirm?: () => void) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: message,
        confirmButtonColor: '#a5dc86',
        cancelButtonColor: '#f27474',
        cancelButtonText: icon === SweetAlertIcon.Question ? NO : CANCEL,
        confirmButtonText: icon === SweetAlertIcon.Question ? YES : OK,
        showConfirmButton: icon === SweetAlertIcon.Question || icon === SweetAlertIcon.Info || icon === SweetAlertIcon.Succes ? true : false,
        showCancelButton: icon === SweetAlertIcon.Question || icon === SweetAlertIcon.Error ? true : false
    }).then((resultContent: SweetAlertResult<any>) => {
        if (resultContent['isConfirmed'] && (onConfirm))
            onConfirm()
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

export const onUploadPhoto = (event: any, id: string, url: string): void => {
    const formdata: FormData = new FormData()
    formdata.append('image', event.target.files[0])
    formdata.append('id', id)
    const getData = async (): Promise<void> => {
        const response = await axios.post(url, formdata, { headers: IMAGE_HEADERS })
    }
    getData()
}

export const reloadPage = (): void => {
    window.location.reload()
}