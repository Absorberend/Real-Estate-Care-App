import React from "react"

import "./LoginPage.css";
import logoBlack from "../assets/logo-zwart.svg";

export default function LoginPage({onLoginSubmit, unAuthLogIn, authValue, onAuthSubmit, loginFailed}) {
  return (
    <div className="login__page__container">
        <header>
            <div className="login__page__logo__container">
                <img src={logoBlack} alt="black logo" className="login__page__logo__img" />
                <div className="login__page__logo__text__wrapper">
                    <span className="login__page__logo__text">Real Estate Care</span>
                    <span className="login__page__logo__sub__text">Caring is in our nature</span>
                </div>
            </div>
        </header>        
        {!unAuthLogIn && (
            <>
                <main className="login__page__main">
                    <form className="login__page__login__container" onSubmit={onLoginSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            autoComplete="username" 
                            autoFocus 
                            required 
                        />
                        <label htmlFor="pass">Password:</label>
                        <input 
                            type="password" 
                            id="pass" 
                            name="password" 
                            autoComplete="current-password" 
                            required 
                        />
                        <input 
                            type="submit" 
                            value="Sign in" 
                            className="login__page__login__button" 
                        />
                    </form>
                </main>

                {loginFailed && <span>The username or password is incorrect</span>}
            </>
        )}

        {unAuthLogIn && (
            <>
                <main className="login__page__main">
                    <form className="login__page__login__container" onSubmit={onAuthSubmit}>
                        <span className="login__page__auth__text">Enter the code from <br /> your authenticator app.</span>
                        <label htmlFor="auth">Auth code:</label>
                        <input 
                            type="text" 
                            id="auth" 
                            name="auth" 
                            autoComplete="off" 
                            autoFocus 
                            required 
                        />
                        <input type="submit" value="Sign in" className="login__page__login__button" />
                    </form>
                </main>

                {loginFailed && (
                    <span>The authentication code is incorrect</span>
                )}

                <div className="login__page__main login__page__demo__auth">
                    <span>For demo purposes you can use this auth code:</span>
                    <span className="login__page__auth__value">{authValue}</span>
                </div>
            </>
        )}
    </div>
  )
}
