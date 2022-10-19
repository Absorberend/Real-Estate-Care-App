import React from 'react'

import "./HomePage.css";
import CompletedReports from './menu/CompletedReports';

export default function HomePage({loggedInUser, data, onCategoryDisplay}) {

  return (
    <>
        <section className="home__page">
            <h1>Real Estate Care App</h1>
            <span>Welkom terug, {loggedInUser[0].firstName || 'Collega'}!</span>
          </section>
            <CompletedReports data={data} onCategoryDisplay={onCategoryDisplay}/>
           
    </>
  )
}
