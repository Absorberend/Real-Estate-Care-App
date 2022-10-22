import React from 'react'

import "./HomePage.css";

export default function HomePage({loggedInUser}) {

  return (
    <>
        <section className="home__page">
            <h1>Real Estate Care App</h1>
            <span>Welkom terug, {loggedInUser[0].firstName || 'Collega'}!</span>
        </section>       
    </>
  )
}
