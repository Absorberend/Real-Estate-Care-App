import React, { useEffect } from "react"

import { Link } from "react-router-dom";

import "./ErrorPage.css";
import logoBlack from "../assets/logo-zwart.svg";

export default function ErrorPage({unAuthLogIn, authLogIn, onCloseReportsModalClick}) {

  useEffect(() => {
    onCloseReportsModalClick();

  }, [])

  
  return (
    <div className="error__page__container">
      {!unAuthLogIn && !authLogIn && (
        <header>
            <div className="error__page__logo__container">
                <img src={logoBlack} alt="black logo" className="error__page__logo__img" />
                <div className="error__page__logo__text__wrapper">
                    <span className="error__page__logo__text">Real Estate Care</span>
                    <span className="error__page__logo__sub__text">Caring is in our nature</span>
                </div>
            </div>
        </header>
      )}        
   
      <main className="error__page__main">
        <h2>Oops!</h2>
        <h4>Sorry, it looks like we can"t find this page anymore.</h4>
        <p>We have done our best, but it appears as if we can"t find the page. Maybe this page is moved or it doesn"t exist.</p>
        <p>You can always go back to our <Link to="/" className="error__page__link">homepage</Link>.</p>
      </main>
    </div>
  )
}
