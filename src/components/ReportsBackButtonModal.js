import React from "react"

import { useNavigate } from "react-router-dom";

import "./ReportsBackButtonModal.css"

export default function ReportsBackButtonModal({url, onReportsModalToggleClick}) {
    const navigate = useNavigate();

  return (

    <div className="reports__modal__container">
        <span>Weet u zeker dat u deze pagina wilt verlaten?</span>
        <span>Bij het verlaten van deze pagina verliest u de door u ingevulde data.</span>
        <div className="reports__modal__buttons__container">
            <button onClick={() => {
                onReportsModalToggleClick();
                navigate(url);
            }}>Ja</button>
            <button onClick={() => {
                onReportsModalToggleClick();
            }}>Nee</button>
        </div>
    </div>

  )
}
