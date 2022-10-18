import React from 'react'
import { Link } from 'react-router-dom';

import "./TopBar.css";
import logoWhiteIcon from "../assets/logo-wit.svg";

export default function TopBar({onSideMenuToggleClick, onSideMenuClose, loggedInUser}) {
  return (
    <>
        <Link 
            className="top__bar__logo__container"
            to="/"
            onClick={onSideMenuClose}
        >
        <img 
            src={logoWhiteIcon} 
            alt="Bedrijfslogo" 
            className="top__bar__logo__image"
        />
        <div className="top__bar__logo__text__wrapper">
            <span className="top__bar__logo__text">Real Estate Care</span>
            <span className="top__bar__logo__sub__text">Caring is in our nature</span>
        </div>
        </Link>
        <button className="top__bar__profile__container" onClick={onSideMenuToggleClick}>
        <img 
            src={loggedInUser[0].avatar} 
            alt="avatar" 
            className="top__bar__profile__img"
        />
        </button>
    </>
  )
}
