import { useToast } from "vue-toastification";
import { AlertType } from "../utils/entities/AlertType";

const toast = useToast();

export function notify(type: AlertType, message: string) {
    switch(type) {
        case AlertType.ERROR:
            toast.error(message);
            break;
        case AlertType.WARNING:
            toast.warning(message)
            break;
        case AlertType.SUCCESS:
            toast.success(message)
            break;
        default:
            toast(message);
    }
}

/**
 * Displays a notification for the most common metamask errors.
 * @param code the error code as given by metamask
 */
export function notifyMetamask(code: number) {
    switch(code) {
        case 4001:
            toast.warning("You rejected the transaction");
            break;
        case -32603:
            toast.error("Mathematical error. Try reducing the number of decimals")
            break;
        case 1:
            toast.success("Operation successfull");
            break;
        case 0:
            toast.error("Transaction was not confirmed on the blockchain")
            break;
        default:
            toast.error("Some unknown error has occurred");
            break;
    }
}