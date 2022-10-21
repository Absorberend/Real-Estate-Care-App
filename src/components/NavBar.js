import React, { useEffect, useState } from 'react'
import { NavLink, useLocation} from 'react-router-dom'


import "./NavBar.css";
import bookIcon from "../assets/book.svg";
import checkIcon from "../assets/clipboard-check.svg";
import reportIcon from "../assets/clipboard-list.svg";

export default function NavBar({onSideMenuClose, data, onReportsModalToggleClick}) {
    const [matchedURL, setMatchedURL] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if(data) {
            setMatchedURL(data.filter(report => report.id === location.pathname.slice(13)));
        }
    }, [data, location])

    const handleLinkClick = (e) => {
        onSideMenuClose();

        if (matchedURL.length > 0) {
        onReportsModalToggleClick(e.currentTarget.dataset.url);
        }
    }

    let activeStyle = {
        opacity: "0.6"
    };


  return (
    <>
        <div className="nav__footer">
            <NavLink 
                to={matchedURL.length > 0 ? null : "/AssignedReports"} 
                className="nav__footer__link__default"
                onClick={handleLinkClick}
                data-url="/AssignedReports"
                style={({ isActive }) => isActive && matchedURL.length > 0 ? activeStyle : undefined}
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
                to={matchedURL.length > 0 ? null : "/CompletedReports"} 
                className="nav__footer__link__default"
                onClick={handleLinkClick}
                data-url="/CompletedReports"
                style={({ isActive }) => isActive && matchedURL.length > 0 ? activeStyle : undefined}
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
                to={matchedURL.length > 0 ? null : "/KnowledgeBase"} 
                className="nav__footer__link__default"
                onClick={handleLinkClick}
                data-url="/KnowledgeBase"
                style={({ isActive }) => isActive && matchedURL.length > 0 ? activeStyle : undefined}
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
