import React from "react";
import PopupWithForm from "./PopupWithForm";
import { currentUserContext } from "../contexts/CurrentUserContext";

function EditProfileModal(props) {
    const [name, setName] = React.useState("");
    const [about, setAbout] = React.useState("");

    function handleName(e) {
        setName(e.target.value);
    }
    function handleAbout(e) {
        setAbout(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: about,
        });
    }

    // Subscription to the context
    const currentUser = React.useContext(currentUserContext);

    // After loading the current user from the API
    // their data will be used in managed components.
    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser]);

    return (
        <PopupWithForm
            name="edit-profile"
            title="Edit Profile"
            buttonText="Save"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="profile-name"
                type="text"
                defaultValue={name}
                placeholder="title"
                className="modal__input modal__input_name"
                name="title"
                required
                maxLength="40"
                minLength="2"
                onChange={handleName}
            />
            <span id="profile-name-error" className="modal__error"></span>
            <input
                id="profile-desc"
                type="text"
                defaultValue={about}
                placeholder="description"
                className="modal__input modal__input_desc"
                name="desc"
                required
                maxLength="200"
                minLength="2"
                onChange={handleAbout}
            />
            <span id="profile-desc-error" className="modal__error"></span>
        </PopupWithForm>
    );
}

export default EditProfileModal;
