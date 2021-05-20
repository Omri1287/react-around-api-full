import React from "react";
import Check from "../images/Check.svg";
import Xerror from "../images/Xerror.svg";

function InfoTooltip(props) {
    return (
        <div
            className={`modal__toolTip ${
                props.isOpen ? "modal__toolTip_visible" : ""
            }`}
            onClick={props.onClose}
        >
            {/* <div className="modal__container"> */}
            <div className="modal__content">
                <img
                    className="modal__icon"
                    src={props.valid ? Check : Xerror}
                    alt={props.valid ? "Check Mark" : "Error"}
                />
                {props.valid ? (
                    <p className="modal__infotool-text">
                        Success! You have now been registered.
                    </p>
                ) : (
                    <p className="modal__infotool-text">
                        Oops, something went wrong! Please try again
                    </p>
                )}
            </div>
            <button
                className="modal__close link"
                onClick={props.onClose}
            ></button>
        </div>
        // </div>
    );
}

export default InfoTooltip;
