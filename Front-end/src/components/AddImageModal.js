import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddImageModal(props) {
    const [cardLink, setCardLink] = React.useState("");
    const [cardName, setCardName] = React.useState("");

    function handleCardLink(e) {
        setCardLink(e.target.value);
    }
    function handleCardName(e) {
        setCardName(e.target.value);
    }
    function handleAddCard(e) {
        e.preventDefault();
        props.handleAddPlaceSubmit({
            name: cardName,
            link: cardLink,
        });
    }
    return (
        <PopupWithForm
            name="add-image"
            title="New Place"
            buttonText="Save"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleAddCard}
        >
            <input
                id="card-name"
                type="text"
                placeholder="Name"
                className="modal__input modal__input_image-name"
                name="name"
                onChange={handleCardName}
                value={cardName}
                required
                maxLength="30"
                minLength="2"
            />
            <span id="card-name-error" className="modal__error"></span>
            <input
                id="card-link"
                type="url"
                placeholder="image-link"
                className="modal__input modal__input_url"
                name="link"
                onChange={handleCardLink}
                value={cardLink}
                required
            />
            <span id="card-link-error" className="modal__error"></span>
        </PopupWithForm>
    );
}
export default AddImageModal;
