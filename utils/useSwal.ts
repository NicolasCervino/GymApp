import { useState } from "react";
import Swal, { SweetAlertIcon } from "sweetalert2";

export const useSweetAlert = () => {
  const [showingAlert, setShowingAlert] = useState<boolean>(false);

  const showAlert = (text: string, icon: SweetAlertIcon, callback?: () => void) => {
    setShowingAlert(true);
    Swal.fire({
      toast: true,
      position: "bottom",
      text: text,
      showConfirmButton: false,
      icon: icon,
      timer: 1500,
      timerProgressBar: true,
      allowEscapeKey: false,
    }).then(() => {
      if (callback) {
        callback();
      }
      setShowingAlert(false);
    });
  };

  return { showAlert, showingAlert };
};
