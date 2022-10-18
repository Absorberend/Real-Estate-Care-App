import React from 'react'

import "./BackButton.css";
import ArrowLeft from "../assets/arrow-left.svg";
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <div className="back__button__default__wrapper">
            <button className="back__button__default" onClick={() => navigate(-1)}>
                <img src={ArrowLeft} alt="page back" />
            </button>
        </div>
    )
}
