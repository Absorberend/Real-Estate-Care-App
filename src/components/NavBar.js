import React from 'react'
import { NavLink } from 'react-router-dom'

import "./NavBar.css";
import bookIcon from "../assets/book.svg";
import checkIcon from "../assets/clipboard-check.svg";
import reportIcon from "../assets/clipboard-list.svg";

export default function NavBar({onSideMenuClose}) {
  return (
    <>
        <div className="nav__footer">
            <NavLink 
                to="/AssignedReports" 
                className="nav__footer__link__default"
                onClick={onSideMenuClose}
            >
                <img 
                src={reportIcon} 
                alt="report icon" 
                />
                <span className="nav__footer__link__hidden">
                Assigned Reports
                </span>
            </NavLink>

            <NavLink 
                to="/CompletedReports" 
                className="nav__footer__link__default"
                onClick={onSideMenuClose}
            >
                <img 
                src={checkIcon} 
                alt="checked report icon" 
                />
                <span className="nav__footer__link__hidden">
                Completed Reports
                </span>
            </NavLink>

            <NavLink 
                to="/KnowledgeBase" 
                className="nav__footer__link__default"
                onClick={onSideMenuClose}
            >
                <img 
                src={bookIcon} 
                alt="book icon" 
                />    
                <span className="nav__footer__link__hidden">
                Knowledge Base
                </span>
            </NavLink>
        </div>
    </>
  )
}
