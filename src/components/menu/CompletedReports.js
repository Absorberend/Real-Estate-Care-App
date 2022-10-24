import React, {useState} from "react"

import { useLocation, useNavigate } from "react-router-dom";

import "./CompletedReports.css";
import chrevronDown from "../../assets/chevron-down.svg";
import chrevronUp from "../../assets/chevron-up.svg";
import editIcon from "../../assets/edit.svg";
import trashcanIcon from "../../assets/trash-x.svg";
import useFetch from "../../hooks/useFetch";
import BackButton from "../BackButton.js";

export default function CompletedReports({data, onCategoryDisplay}) {
  const [filteredReport, setFilteredReport] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [didExpand, setDidExpand] = useState(false);
  const {isPending, error, del} = useFetch();
  const locationURL = useLocation();
  const navigate = useNavigate();
  let viewReport = [];
 
  const handleReportClick = (id) => {
    let filteredReportEL = data.filter(report => report.id === id);

    if (!didExpand) {
      setFilteredReport(filteredReportEL);
      setDidExpand(true);
    } else if (id !== filteredReport[0].id) {
      setFilteredReport(filteredReportEL);
    } else if (id === filteredReport[0].id) {
      setFilteredReport([]);
      setDidExpand(false);
    }
  }

  const handleDeleteModalClick = () => {
    setDeleteModal(prevDeleteModal => !prevDeleteModal);
  }

  if (data) {
    viewReport = data.filter(report => report.completed === "true")
      .sort((a,b) => new Date(b.date) - new Date(a.date))
      .map(report => {
        return (
          <div key={`dateSorted${report.id}`}>
            <button 
              key={report.id} 
              className={filteredReport[0]?.id === report.id ? `completed__reports__button expanded__overview__button` : `completed__reports__button`}
              onClick={() => handleReportClick(report.id)}
            >
              <span>{`${new Date(report.date).toLocaleDateString()}`}</span>
              <span>{`${onCategoryDisplay(report.category)}`}</span>
              <span>{`${report.location.split(", ")[0]}`}</span>
              <span>{`${report.location.split(", ")[2]}`}</span>
              <span>
                <img 
                  src={chrevronDown} 
                  alt="expand report" 
                  className="completed__reports__button__icon__hidden"
                />-
              </span>
              <img 
                src={filteredReport[0]?.id === report.id ? chrevronUp : chrevronDown} 
                alt="expand report" 
                className="completed__reports__button__icon" 
              />
            </button>
            {filteredReport[0]?.id === report.id && (   
              <div key={`filtered${report.id}`} className="completed__reports__overview__container">
                  <div className="completed__reports__overview__expanded__reports">
                    <span>Datum:</span>
                    <span>{new Date(report.date).toLocaleDateString()}</span> 
                  </div> 
                  <div className="completed__reports__overview__expanded__reports">
                    <span>Locatie:</span>
                    <span>{report.location}</span> 
                  </div>
                  {report?.modificationEncountered && (
                    <div className="completed__reports__overview__expanded__reports">
                      <span>Gedocumenteerde modificaties:</span>
                      <img src={report.modificationEncountered} alt="gedocumenteerde modificatie" />
                    </div>
                  )}
                  {report?.installationType && (
                    <div className="completed__reports__overview__expanded__reports">
                      <span>Soort installatie:</span>
                      <span>{report.installationType}</span> 
                    </div>
                  )}
                  {report?.maintenanceType && (
                    <div className="completed__reports__overview__expanded__reports">
                      <span>Soort onderhoud:</span>
                      <span>{report.maintenanceType}</span> 
                    </div>
                  )}
                  {report?.newDamages && (
                    <div className="completed__reports__overview__expanded__reports">
                      <span>Nieuwe schade:</span>
                      <span>{report.newDamages}</span> 
                    </div>
                  )}
                  {report?.carriedOutBy && (
                    <div className="completed__reports__overview__expanded__reports">
                      <span>Uitgevoerd door:</span>
                      <span>{report.carriedOutBy}</span> 
                    </div>
                  )}
                  {report?.reportedMalfunction && (
                    <div className="completed__reports__overview__expanded__reports">
                      <span>Gemelde storingen:</span>
                      <span>{report.reportedMalfunction}</span> 
                    </div>
                  )}
                  {report?.acuteActionRequired && (
                    <div className="completed__reports__overview__expanded__reports">
                      <span>Acute actie vereist:</span>
                      <span>{report.acuteActionRequired}</span> 
                    </div>
                  )}
                  {report?.damageType && (
                    <div className="completed__reports__overview__expanded__reports">
                      <span>Soort schade:</span>
                      <span>{report.damageType}</span> 
                    </div>
                  )}
                  {report?.descriptionModification && (
                    <div className="completed__reports__overview__expanded__reports">
                      <span>Beschrijving modificaties:</span>
                      <span>{report.descriptionModification}</span> 
                    </div>
                  )}
                  {report?.testProcedure && (
                    <div className="completed__reports__overview__expanded__reports">
                      <span>Testprocedure:</span>
                      <span>
                        {<a 
                          href={report.testProcedure} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                            {report.testProcedure}
                        </a>}
                      </span> 
                    </div>
                  )}
                  {report?.costIndication && (
                    <div className="completed__reports__overview__expanded__reports">
                      <span>Kostenindicatie:</span>
                      <span>{report.costIndication}</span> 
                    </div>
                  )}
                  {report?.action && (
                    <div className="completed__reports__overview__expanded__reports">
                      <span>Te ondernemen actie:</span>
                      <span>{report.action}</span> 
                    </div>
                  )}
                  {report?.approved && (
                    <div className="completed__reports__overview__expanded__reports">
                      <span>Goedgekeurd:</span>
                      <span>{report.approved}</span> 
                    </div>
                  )}
                  {report?.description && (
                    <div className="completed__reports__overview__expanded__reports">
                      <span>Opmerkingen:</span>
                      <span>{report.description}</span> 
                    </div>
                  )}
                  {report?.pictures && (
                    <div className="completed__reports__overview__expanded__reports">
                      <span>Foto:</span>
                      <img 
                        src={report.pictures} 
                        alt="gedocumenteerde modificatie" 
                        className="completed__reports__overview__img" 
                      />
                    </div>
                  )} 
                  {deleteModal && (
                    <div className="overview__container__delete__modal__wrapper">
                      <div className="overview__container__delete__modal">
                        <span>Weet u zeker dat u dit inspectierapport wilt verwijderen?</span>
                        <span>Het rapport wordt volledig verwijderd en is niet meer terug te halen.</span>
                        <div className="overview__container__delete__modal__buttons__wrapper">
                          <button 
                            onClick={() => {
                              del("reports", report.id);
                              handleDeleteModalClick();
                            }}
                            className="overview__container__delete__modal__button">
                              Ja
                            </button>
                          <button 
                            className="overview__container__delete__modal__button" 
                            onClick={() => handleDeleteModalClick()}>
                              Nee
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                <div className="overview__button__container">
                  <button className="overview__edit__button" onClick={() => navigate(`/EditReports/${report.id}`)}>
                    <img src={editIcon} alt="edit icon" />
                    Rapport Wijzigen
                  </button>  
                  <button className="overview__delete__button" onClick={handleDeleteModalClick}>
                    <img src={trashcanIcon} alt="delete icon" />
                    Delete
                  </button>
                </div>

              </div>
            )}
          </div>
        )})
  };

  return (
    <>
      {locationURL.pathname === "/CompletedReports" && (
        <div className="completed__reports__back__button">
          <BackButton />
        </div>
      )}
      <section className="completed__reports__container">
        <h2>Uitgevoerde rapportages</h2>
        <div className="completed__reports__legenda">
          <span>Datum</span>
          <span>Type</span>
          <span>Straat</span>
          <span>Plaats</span>
          <span className="completed__reports__legenda__hidden">Hidden</span>
        </div>
        {isPending && (
          <div className="completed__reports__button__container completed__reports__loading__error__messages">Loading...</div>
        )}
        {!isPending && !error && (
          <div className="completed__reports__button__container">
            {viewReport}
          </div>
        )}
        {error && (
          <div className="completed__reports__button__container completed__reports__loading__error__messages">
            {error}
          </div>
        )}
      </section>
    </>
  )
}
