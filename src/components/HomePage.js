import React from 'react'

import "./HomePage.css";
import reportIcon from "../assets/clipboard-list.svg";
import CompletedReports from './menu/CompletedReports';
import { Link } from 'react-router-dom';

export default function HomePage({loggedInUser, data}) {

  return (
    <>
        <section className="home__page">
            <h1>Welkom terug, {loggedInUser[0].firstName || 'Collega'}!</h1>
            <div className="home__page__new__report__wrapper">
            <span>Nieuwe inspectie starten:</span>
            <Link 
                className="home__page__link"
                to="/AddReports"
            >
                <img src={reportIcon} alt="report icon" className="home__page__link__icon"/>
            </Link>
            </div>
          </section>
            <CompletedReports data={data}/>
           
    </>
  )
}
