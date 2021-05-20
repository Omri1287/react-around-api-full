import React from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(currentUserContext);

    // Checking if you are the owner of the current card
    const isOwn = props.owner._id === currentUser._id;

    // Creating a variable which you'll then set in `className` for the delete button
    const cardDeleteButtonClassName = `elements__item_delete ${
        isOwn ? "elements__item_delete_show" : "elements__item_delete_hidden"
    }`;
    // Check if the card was liked by the current user
    const isLiked = props.likes.some((i) => i._id === currentUser._id);

    // Create a variable which you then set in `className` for the like button

    const cardLikeButtonClassName = `elements__heart ${
        isLiked ? "elements__heart_active" : "elements__heart"
    }`;
    // function deleteCard(){
    //     props.onDeleteClick(props.card)
    // }
    // function handleLike(){
    //     console.log(props.card)
    //     props.onCardLike(props.card)
    // }
    // function handleCardClick() {
    //     props.onCardClick(props.card)
    // }
    return (
        <li className="elements__item">
            <img
                className="elements__image"
                src={props.src}
                alt={props.title}
                onClick={() => {
                    props.handleCardClick(props.src, props.title);
                }}
            />
            <button
                className={cardDeleteButtonClassName}
                onClick={() => {
                    props.handleDeleteClick(props.card);
                }}
            ></button>
            <div id="title-container" className="elements__container">
                <h2 className="elements__title">{props.title}</h2>
                <div className="elements__heart-container">
                    <button
                        type="button"
                        className={cardLikeButtonClassName}
                        onClick={() => {
                            props.handleCardLike(props.card);
                        }}
                    ></button>
                    <p className="elements__heart-count">
                        {props.likes.length}
                    </p>
                </div>
            </div>
        </li>
    );
}
export default Card;
