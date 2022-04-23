import React,{useState} from "react";
import AlertContext from "./AlertContext";
export default function AlertState(props) {
  const [alertData, setalertData] = useState(null);
  const toggleAlert = (success, message) => {
    setalertData({
      success: success,
      message: message,
    });
    setTimeout(() => {
      setalertData(null);
    }, 1500);
  };
  return (
    <AlertContext.Provider value={{ toggleAlert, alertData }}>
      {props.children}
    </AlertContext.Provider>
  );
}
