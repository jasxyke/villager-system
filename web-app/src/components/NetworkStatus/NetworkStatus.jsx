import React from "react";
import { useAlert } from "../../contexts/AlertBox/AlertContext";

const NetworkStatus = () => {
  const [status, setStatus] = useState(true);
  const { showAlert } = useAlert();

  useEffect(() => {
    function changeStatus() {
      setStatus(navigator.onLine);
    }
    window.addEventListener("online", changeStatus);
    window.addEventListener("offline", changeStatus);
    return () => {
      window.removeEventListener("online", changeStatus);
      window.removeEventListener("offline", changeStatus);
    };
  }, []);

  if (status === "Online") {
    showAlert("");
  }
};
