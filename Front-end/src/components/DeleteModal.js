import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteModal(props) {
    return (
        <PopupWithForm
            name="delete"
            buttonText="Yes"
            title="Are you sure?"
            isOpen={props.isOpen}
            onClose={props.onClose}
        ></PopupWithForm>
    );
}

export default DeleteModal;
