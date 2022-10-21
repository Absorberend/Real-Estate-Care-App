import React from 'react'

import "./BackButton.css";
import ArrowLeft from "../assets/arrow-left.svg";

import { useLocation, useNavigate } from 'react-router-dom';

export default function BackButton({onReportsModalToggleClick}) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        if (location.pathname.includes('/EditReports')) {
            onReportsModalToggleClick(-1);
        } else {
            navigate(-1);
        }
    }

    return (
        <>
            <div className="back__button__default__wrapper">
                <button className="back__button__default" onClick={handleBackButtonClick}>
                    <img src={ArrowLeft} alt="page back" />
                </button>
            </div>
        </>
    )
}
