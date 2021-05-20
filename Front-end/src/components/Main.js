//import React, { useState, useEffect, createContext } from "react";
import React from "react";

//import jacques from "../images/jacques-cousteau.jpg";
//import api from "../Utils/Api";
import Card from "./Card";
import { currentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";

function Main(props) {
    //   const [userName, setUserName] = React.useState("")
    //   const [userDescription,setUserDescription] = React.useState("")
    //   const [userAvatar, setUserAvatar] = React.useState("")
    const currentUser = React.useContext(currentUserContext);
    //const [cards, setCards] = React.useState([])
    //check if the url is the correct one
    //   const searchUrl = window.location.href
    //   if(searchUrl.endsWith("/signin") || searchUrl.endsWith("/signup")){
    //       return null;
    //   }
    //   useEffect(() => {
    //     api.getUserInfo()
    //     .then((res) => {
    //         setUserName(res);
    //         setUserDescription(res);
    //         setUserAvatar(res);
    //         setCurrentUser(res)
    //     })
    //     .then(() => {
    //         api.getCardList()
    //         .then((res) => {
    //             setCards(
    //                 res.map((card) => ({
    //                     name: card.name,
    //                     link: card.link,
    //                     _id: card._id,
    //                     likes: card.likes,
    //                     owner: card.owner,
    //             })))
    //         })
    //         .catch((err) => console.log(err));
    //     })
    //     .catch((err) => console.log(err));
    //   }, [])

    return (
        <main className="content">
            <Header
                link={"/signin"}
                text={"Log out"}
                onClick={props.handleLogout}
                userEmail={props.userEmail}
            />
            <section className="profile">
                <div className="profile__avatar">
                    <img
                        src={currentUser.avatar}
                        alt="profile picture"
                        className="profile__photo"
                    />
                    <button
                        type="button"
                        aria-label="edit-avatar"
                        className="profile__photo_edit"
                        onClick={props.handleEditAvatarClick}
                    ></button>
                </div>
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__text_name">
                            {currentUser.name}
                        </h1>
                        <button
                            className="profile__edit-button"
                            onClick={props.handleEditProfileClick}
                        ></button>
                    </div>
                    <h2 className="profile__text_desc">{currentUser.about}</h2>
                </div>
                <button
                    className="profile__add-button"
                    onClick={props.handleAddPlaceClick}
                ></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {props.cards.map((card, id) => (
                        <Card
                            card={card}
                            key={id}
                            _id={card._id}
                            src={card.link}
                            title={card.name}
                            likes={card.likes}
                            owner={card.owner}
                            handleCardClick={() => {
                                props.handleCardClick(card.link, card.name);
                            }}
                            handleDeleteClick={(card) => {
                                props.handleDeleteClick(card);
                            }}
                            handleCardLike={(card) => {
                                props.handleCardLike(card);
                            }}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
