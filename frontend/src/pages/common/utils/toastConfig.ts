import { toast, Zoom } from "react-toastify";

const toastDuration = 2000;

export function showErrorToast(errorMessage: string | undefined) {
  toast.error(errorMessage, {
    position: "bottom-center",
    autoClose: toastDuration,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Zoom,
  });
}

export function showSuccessToast(successMessage: string) {
  toast.success(successMessage, {
    toastId: "successToast",
    position: "bottom-center",
    autoClose: toastDuration,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Zoom,
  });
}

export function showInfoToast(infoMessage: string) {
  toast.info(infoMessage, {
    toastId: "infoToast",
    position: "bottom-center",
    autoClose: toastDuration,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Zoom,
  });
}
export function showWarningToast(warningMessage: string | undefined) {
  toast.warn(warningMessage, {
    toastId: "warningToast",
    position: "bottom-center",
    autoClose: toastDuration,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Zoom,
  });
}
