import React, { useContext,useEffect } from "react";
import AlertContext from "../context/Alert/AlertContext";
 
export default function Alert() {
  let alertContext = useContext(AlertContext);
  let { alertData } = alertContext;  
  return (
    <div>
      {alertData ? (
        <div
         id="toast"
          class="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="toast-header">
            <img
              src="..."
              class="rounded me-2"
              alt={alertData.success === "success" ? "✅" : "❌"}
            />
            <strong class="me-auto">{alertData.success}</strong>
            <small>just now</small>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div class="toast-body">{alertData.message}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );

  //     {{alertData!==null}?(
  //<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  //       <div class="toast-header">
  //         <img
  //           src="..."
  //           class="rounded me-2"
  //           alt={alertData.success === "success" ? "✅" : "❌"}
  //         />
  //         <strong class="me-auto">{alertData.success}</strong>
  //         <small>just now</small>
  //         <button
  //           type="button"
  //           class="btn-close"
  //           data-bs-dismiss="toast"
  //           aria-label="Close"
  //         ></button>
  //       </div>
  //       <div class="toast-body">{alertData.message}</div>
  //     </div>

  //   ):( <></>);
  // }
  // }
}
