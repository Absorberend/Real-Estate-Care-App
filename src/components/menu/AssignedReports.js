import React, {useState} from "react";

import { useNavigate } from "react-router-dom";

import BackButton from "../BackButton";
import useFetch from "../../hooks/useFetch";
import "./AssignedReports.css";

import arrowBarRight from "../../assets/arrow-bar-right.svg";
import infoIcon from "../../assets/info-circle.svg";


export default function AssignedReports({data, loggedInUser, onCategoryDisplay}) {
  const [showTypeInfo, setShowTypeInfo] = useState(false);
  const { isPending, error} = useFetch();
  const navigate = useNavigate();
  let viewAssignedReport = [];

  const handleTypeInfoClick = () => {
    setShowTypeInfo(prevShowTypeInfo => !prevShowTypeInfo);
  }

  if (data) {
    viewAssignedReport = data.filter(report => (
      loggedInUser[0].id === report.userId && report.completed === "false"
    )).sort((a,b) => (
      new Date(b.date) - new Date(a.date)
    )).map(report => {
      return ( 
        <div key={`AssignedReport:${report.id}`} className="assigned__reports__singles">
          <span>{`${onCategoryDisplay(report.category)}`}</span>
          <span>{`${report.location.split(", ")[0]}`}</span>
          <span>{`${report.location.split(", ")[2]}`}</span>
          <button onClick={() => navigate(`/EditReports/${report.id}`)} className="assigned__reports__button"><img src={arrowBarRight} alt="navigate to report" /></button>
        </div>
      )
    })
  }

  return (
    <>
      <section className="assigned__reports__section">
        <BackButton />
        <h2>Toegewezen rapportages</h2>
        <div className="assigned__reports__legenda">
          <span className="assigned__reports__legenda__type">Type 
            <button onClick={handleTypeInfoClick} className="assigned__reports__legenda__info__button">
              <img src={infoIcon} alt="show type info" />
            </button>
          </span>
          <span>Straat</span>
          <span>Plaats</span>
          <button className="assigned__reports__button__hidden">hidden</button>
          {showTypeInfo && (
            <div className="assigned__reports__show__info">
              <p>O = Onderhoud</p>
              <p>S = Schade</p>
              <p>M = Modificaties</p>
              <p>I = Installaties </p>
            </div>
          )}
        </div>
        <div className="assigned__reports__container">
          {isPending && (
            <p className="assigned__reports__error__loading__default">Loading...</p>
          )}
          {!isPending && viewAssignedReport}
          {!isPending && error && (
            <p className="assigned__reports__error__loading__default">There was an error loading the reports.</p>
          )}
          {viewAssignedReport.length === 0 && !isPending && (
            <p className="assigned__reports__error__loading__default">Er zijn geen rapporten aan jou toegewezen op dit moment.</p>
          )}
        </div>
      </section>

    </>
  )
}
