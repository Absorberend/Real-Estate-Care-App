import React from 'react'
import { Link } from 'react-router-dom';

import bookIcon from "../assets/book.svg";
import checkIcon from "../assets/clipboard-check.svg";
import reportIcon from "../assets/clipboard-list.svg";
import settingsIcon from "../assets/settings.svg";

import "./HomePage.css";

export default function HomePage({}) {

  return (
    <>
        <section className="home__page">
            <div className="home__page__links__container">
              <Link to="/AssignedReports" className="home__page__link"><img src={reportIcon} alt="toegewezen rapportages icon" /><span>Assigned Reports</span></Link>
              <Link to="/CompletedReports" className="home__page__link"><img src={checkIcon} alt="afgeronde rapportages icon" /><span>Completed Reports</span></Link>
              <Link to="/KnowledgeBase" className="home__page__link"><img src={bookIcon} alt="kennisbank icon" /><span>Knowledge Base</span></Link>
              <Link to="/Settings" className="home__page__link"><img src={settingsIcon} alt="instellingen icon" /><span>Settings</span></Link>
            </div>
        </section>       
    </>
  )
}
