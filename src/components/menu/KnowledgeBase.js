import React, {useState} from 'react'

import "./KnowledgeBase.css";

import chevronDown from "../../assets/chevron-down.svg";
import chevronUp from "../../assets/chevron-up.svg";

import BackButton from '../BackButton'

export default function KnowledgeBase({data}) {
  const [expandType, setExpandType] = useState(false);

  const filteredInstallations = data.filter(report => report.category === 'installations');

  const filteredCooling = filteredInstallations.filter(report => report.installationType === 'koeling');
  const filteredHeating = filteredInstallations.filter(report => report.installationType === 'verwarming');
  const filteredAir = filteredInstallations.filter(report => report.installationType === 'luchtverversing');
  const filteredElectricity = filteredInstallations.filter(report => report.installationType === 'elektra');
  const filteredSecurity = filteredInstallations.filter(report => report.installationType === 'beveiliging');

  const filteredCoolingEL = filteredCooling.map(report => <div key={report.id} className="knowledge__base__overview__default"><span>Test prodecure:</span><a href={report.testProcedure} target="_blank" rel="noopener noreferrer">{report.testProcedure}</a></div>)
  const filteredHeatingEL = filteredHeating.map(report => <div key={report.id} className="knowledge__base__overview__default"><span>Test prodecure:</span><a href={report.testProcedure} target="_blank" rel="noopener noreferrer">{report.testProcedure}</a></div>)
  const filteredAirEL = filteredAir.map(report => <div key={report.id} className="knowledge__base__overview__default"><span>Test prodecure:</span><a href={report.testProcedure} target="_blank" rel="noopener noreferrer">{report.testProcedure}</a></div>)
  const filteredElectricityEL = filteredElectricity.map(report => <div key={report.id} className="knowledge__base__overview__default"><span>Test prodecure:</span><a href={report.testProcedure} target="_blank" rel="noopener noreferrer">{report.testProcedure}</a></div>)
  const filteredSecurityEL = filteredSecurity.map(report => <div key={report.id} className="knowledge__base__overview__default"><span>Test prodecure:</span><a href={report.testProcedure} target="_blank" rel="noopener noreferrer">{report.testProcedure}</a></div>)

  const handleExpandTypeClick = (e) => {
    if (expandType === e.target.innerText.toLowerCase().trim()) {
      setExpandType("");
    } else {
      setExpandType(e.target.innerText.toLowerCase().trim());
    }
  }

  return (
    <section className="knowledge__base__container">
      <BackButton />
      <h2>Kennisbank:</h2>
      <div className="knowledge__base__button__container">
        <h4>Test Procedures:</h4>
        <button 
          onClick={(e) => handleExpandTypeClick(e)} className={expandType === "koeling" ?  `knowledge__base__button knowledge__base__button__expanded` : `knowledge__base__button`}>Koeling <img src={expandType === "koeling" ? chevronUp : chevronDown} alt="expand or close overview icon"/></button>
        <div className="knowledge__base__overview__default__container">
          {expandType === "koeling" && filteredCoolingEL}
          {expandType === "koeling" && filteredCooling.length === 0 && <span className="knowledge__base__overview__default">Er zijn nog geen procedures toegevoegd voor dit installatie type.</span>}
        </div>
        <button onClick={(e) => handleExpandTypeClick(e)}  className={expandType === "verwarming" ?  `knowledge__base__button knowledge__base__button__expanded` : `knowledge__base__button`}>Verwarming <img src={expandType === "verwarming" ? chevronUp : chevronDown} alt="expand or close overview icon"/></button>
        <div className="knowledge__base__overview__default__container">
          {expandType === "verwarming" && filteredHeatingEL}
          {expandType === "verwarming" && filteredHeating.length === 0 && <span className="knowledge__base__overview__default">Er zijn nog geen procedures toegevoegd voor dit installatie type.</span>}
        </div>
        <button onClick={(e) => handleExpandTypeClick(e)}  className={expandType === "luchtverversing" ?  `knowledge__base__button knowledge__base__button__expanded` : `knowledge__base__button`}>Luchtverversing <img src={expandType === "luchtverversing" ? chevronUp : chevronDown} alt="expand or close overview icon"/></button>
        <div className="knowledge__base__overview__default__container">
          {expandType === "luchtverversing" && filteredAirEL}
          {expandType === "luchtverversing" && filteredAir.length === 0 && <span className="knowledge__base__overview__default">Er zijn nog geen procedures toegevoegd voor dit installatie type.</span>}
        </div >
        <button onClick={(e) => handleExpandTypeClick(e)}  className={expandType === "elektra" ?  `knowledge__base__button knowledge__base__button__expanded` : `knowledge__base__button`}>Elektra <img src={expandType === "elektra" ? chevronUp : chevronDown} alt="expand or close overview icon"/></button>
        <div className="knowledge__base__overview__default__container">
          {expandType === "elektra" && filteredElectricityEL}
          {expandType === "elektra" && filteredElectricity.length === 0 && <span className="knowledge__base__overview__default">Er zijn nog geen procedures toegevoegd voor dit installatie type.</span>}
        </div>
        <button onClick={(e) => handleExpandTypeClick(e)}  className={expandType === "beveiliging" ?  `knowledge__base__button knowledge__base__button__expanded` : `knowledge__base__button`}>Beveiliging <img src={expandType === "beveiliging" ? chevronUp : chevronDown} alt="expand or close overview icon"/></button>
        <div className="knowledge__base__overview__default__container">
          {expandType === "beveiliging" && filteredSecurityEL}
          {expandType === "beveiliging" && filteredSecurity.length === 0 && <span className="knowledge__base__overview__default">Er zijn nog geen procedures toegevoegd voor dit installatie type.</span>}
        </div>
      </div>
    </section>
  )
}
