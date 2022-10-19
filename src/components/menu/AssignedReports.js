import React from 'react'


import "./AssignedReports.css";
import BackButton from '../BackButton';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';


export default function AssignedReports({data, loggedInUser, onCategoryDisplay}) {
  const { loading, error} = useFetch();
  const navigate = useNavigate();
  let viewAssignedReport = [];

  if (data) {

    viewAssignedReport = data.filter(report => loggedInUser[0].id === report.userId && report.completed === "false").sort((a,b) => new Date(b.date) - new Date(a.date)).map(report => {
      return ( 
        <div key={`AssignedReport:${report.id}`} className="assigned__reports__singles">
          <span>{`${onCategoryDisplay(report.category)}`}</span>
          <span>{`${report.location.split(', ')[0]}`}</span>
          <span>{`${report.location.split(', ')[2]}`}</span>
          <button onClick={() => navigate(`/EditReports/${report.id}`)} className="assigned__reports__button">Ga naar rapportage</button>
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
          <span>Type</span>
          <span>Straat</span>
          <span>Plaats</span>
          <button className="assigned__reports__button__hidden"></button>
        </div>
        <div className="assigned__reports__container">
          {loading && <p className="assigned__reports__error__loading__default">Loading...</p>}
          {!loading && viewAssignedReport}
          {error && <p className="assigned__reports__error__loading__default">There was an error loading the reports.</p>}
          {viewAssignedReport.length === 0 && <p className="assigned__reports__error__loading__default">Er zijn geen rapporten aan jou toegewezen op dit moment.</p>}
        </div>
      </section>

    </>
  )
}
