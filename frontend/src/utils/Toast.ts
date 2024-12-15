import { toast } from "react-toastify";
import { ToastType } from "../types/user.types";



const MyToast = (message:string, status:ToastType) => {
  if (status === ToastType.SUCCESS) {
    toast.success(message, {
      position: "top-center",
      autoClose: 1000,
    });
  } else if (status === ToastType.ERROR) {
    toast.error(message, {
      position: "top-center",
      autoClose: 1000,
    });
  } else if (status === ToastType.WARNING) {
    toast.warning(message, {
      position: "top-center",
      autoClose: 1000,
    });
  } else if (status === ToastType.INFO) {
    toast.info(message, {
      position: "top-center",
      autoClose: 1000,
    });
  } else {
    console.error("Invalid toast type");
  }
};

export default MyToast;