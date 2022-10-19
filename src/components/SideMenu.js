import React, { useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

import "./SideMenu.css";
import useOutsideClick from '../hooks/useOutsideClick.js';
import closeIcon from "../assets/icon-close.svg";


export default function SideMenu({onSideMenuToggleClick, onOutsideClick, onLogOut}) {
    const ref = useRef();
    const navigate = useNavigate();

    useOutsideClick(ref, () => {
        onSideMenuToggleClick();
    
        //Makes sure that HandleSideMenuToggleClick function doesn't fire at the same time.
       onOutsideClick();
        setTimeout(() =>onOutsideClick(), 200);
      });


  return (
    <>
    <div className="side__bar__menu__wrapper">
        <div className="side__bar__menu__container" ref={ref}>
        <button onClick={onSideMenuToggleClick}>
            <img src={closeIcon} alt="close icon" className="side__bar__close" />
        </button>
        <div className="side__bar__links">
            <NavLink to="/Settings" onClick={onSideMenuToggleClick}>Settings</NavLink>
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
