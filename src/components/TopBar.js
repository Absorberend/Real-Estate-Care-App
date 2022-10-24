import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';

import "./TopBar.css";
import logoWhiteIcon from "../assets/logo-wit.svg";

export default function TopBar({onSideMenuToggleClick, onSideMenuClose, loggedInUser, onReportsModalToggleClick, data}) {
    const [matchedURL, setMatchedURL] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if(data) {
            setMatchedURL(data.filter(report => report.id === location.pathname.slice(13)));
        }
    }, [data, location])

    const handleTopBarClick = () => {
        if (matchedURL.length > 0) {
            onSideMenuClose();
            onReportsModalToggleClick('/');
        } else {
            onSideMenuClose();
        }
    }

  return (
    <>
        <Link 
            className="top__bar__logo__container"
            to={matchedURL.length > 0 ? null : "/"}
            onClick={handleTopBarClick}
        >
        <img 
            src={logoWhiteIcon} 
            alt="Bedrijfslogo" 
            className="top__bar__logo__image"
        />
        <div className="top__bar__logo__text__wrapper">
            <h1 className="top__bar__logo__text">Real Estate Care</h1>
            <span className="top__bar__logo__sub__text">Caring is in our nature</span>
        </div>
        </Link>
        <button className="top__bar__profile__container" onClick={(e) => onSideMenuToggleClick(e)}>
        <img 
            src={loggedInUser[0].avatar} 
            alt="avatar" 
            className="top__bar__profile__img"
        />
        </button>
    </>
  )
}
