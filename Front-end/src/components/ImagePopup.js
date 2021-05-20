import React from "react";

function ImagePopup(props) {
    return (
        <div
            className={`modal modal_type_image ${
                props.isOpen ? "modal_is-open" : ""
            }`}
        >
            <div className="modal__container">
                <button
                    className="modal__close-btn"
                    onClick={props.onClose}
                ></button>
                <figure className="modal__new-container">
                    <img
                        className="modal__large-image"
                        id="img-large"
                        src={props.link}
                        alt={props.title}
                    />
                    <figcaption className="modal__caption">
                        {props.title}
                    </figcaption>
                </figure>
            </div>
        </div>
    );
}
export default ImagePopup;
