import React, { useRef, useState, useEffect } from "react"

import { NavLink, useLocation, useNavigate } from "react-router-dom";

import useOutsideClick from "../hooks/useOutsideClick.js";
import closeIcon from "../assets/icon-close.svg";
import "./SideMenu.css";


export default function SideMenu({onSideMenuToggleClick, onOutsideClick, onLogOut, reportModalOpen, onReportsModalToggleClick, data}) {
    const [matchedURL, setMatchedURL] = useState([]);
    const location = useLocation();
    const ref = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if(data) {
            setMatchedURL(data.filter(report => report.id === location.pathname.slice(13)));
        }
    }, [data, location])

    useOutsideClick(ref, (e) => {
        if(!e.target.classList.contains("side__bar__menu__wrapper")) {
            onSideMenuToggleClick();
    
            //Makes sure that HandleSideMenuToggleClick function doesn"t fire at the same time.
           onOutsideClick();
            setTimeout(() =>onOutsideClick(), 200);
            
        } else {
            onOutsideClick();

            //Makes sure that you don"t accidentally press main content.
            setTimeout(() => {
                onSideMenuToggleClick();
                onOutsideClick();
            }, 200);
        }
      });

    const handleSideMenuLinkClick = () => {

        if (matchedURL.length > 0) {
            if (!reportModalOpen) {
                onSideMenuToggleClick();
                onReportsModalToggleClick("/Settings");
            } else {
                onSideMenuToggleClick();
                onReportsModalToggleClick("/Settings");
            }
        } else {
            onSideMenuToggleClick();
        }
    }

    let activeStyle = {
        textDecoration: "none"
    };


  return (
    <>
    <div className="side__bar__menu__wrapper">
        <div className="side__bar__menu__container" ref={ref}>
        <button onClick={onSideMenuToggleClick}>
            <img 
                src={closeIcon} 
                alt="close icon" 
                className="side__bar__close" 
            />
        </button>
        <div className="side__bar__links">
            <NavLink 
                to={matchedURL.length > 0 ? null : "/Settings"} 
                onClick={handleSideMenuLinkClick}
                style={({ isActive }) => isActive && matchedURL.length > 0 ? activeStyle : undefined}
            >
                Settings
            </NavLink>
            <div>
                <button onClick={() => {
                    onLogOut();
                    navigate("/");  
                }}>Logout</button>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}
