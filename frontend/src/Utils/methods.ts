import Swal from "sweetalert2";
export const errorMessage = (message: string): void => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
    })
}