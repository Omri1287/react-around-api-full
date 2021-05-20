import React from "react";

function PopupWithForm(props) {
    return (
        <div
            className={`modal modal_type_${props.name} ${
                props.isOpen ? "modal_is-open" : ""
            }`}
        >
            <div className="modal__container">
                <button
                    className="modal__close-btn"
                    onClick={props.onClose}
                ></button>
                <form
                    className={`modal__form modal__form_type_${props.name}`}
                    action="#"
                    noValidate
                    onSubmit={props.onSubmit}
                >
                    <h2 className="modal__title">{`${props.title}`}</h2>
                    {props.children}
                    <button
                        type="submit"
                        className="modal__save modal__save_disabled"
                    >
                        {props.buttonText}
                    </button>
                </form>
            </div>
        </div>
        // <div className="modal modal_type_image">
        //         <div className="modal__container">
        //             <button className="modal__close-btn modal__close-btn_type_image"></button>
        //             <figure className="modal__new-container">
        //                 <img className="modal__large-image" id="img-large" src="#" alt="#" />
        //                 <figcaption className="modal__caption"></figcaption>
        //             </figure>
        //         </div>
        // </div>
    );
}

export default PopupWithForm;
