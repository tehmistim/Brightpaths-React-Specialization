import React from 'react';
import './modal.css';
import ReactDOM from 'react-dom';

export default function Modal({ children, isWarningModal }) {
    return ReactDOM.createPortal((
        <div className="modal-backdrop">
            <div className="modal" style={{
                border: "4px solid", 
                borderColor: isWarningModal ? "green" : "red",
                textAlign: "center"
            }}> 
                {children}
                {/* <button 
                onClick={handleClose} 
                className={isWarningModal ? "warning-btn" : ""}
                >close</button> */}
            </div>
        </div>
    ), document.body)
}


//use rfc and hit tab and it will create a Modal function!