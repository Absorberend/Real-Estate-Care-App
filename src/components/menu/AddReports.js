import React, {useState} from 'react'

import "./AddReports.css";
import Damages from '../reportTypes/Damages.js';
import Installations from "../reportTypes/Installations.js";
import Maintenance from "../reportTypes/Maintenance.js";
import Modifications from "../reportTypes/Modifications.js";
import BackButton from '../BackButton';


export default function AddReports() {
  const [category, setCategory] = useState("");
  const [setupCat, setSetupCat] = useState("");

  
  const handlecategorySubmit = (e) => {
    e.preventDefault();
    setCategory(setupCat);
  }

  const handleReportsCategoryReset = () => {
    setCategory("");
  }

  return (
    <>
      {!category && <div className="add__reports__container">
        <BackButton />
        <h2>Nieuwe inspectie starten</h2>
        <h4>Doel van het inspectierapport:</h4>
        <form name="report__type" className="add__reports__form"  onSubmit={handlecategorySubmit}>
          <div className="add__reports__input__default">
            <input type="radio" id="damages" name="report__type" value="damages" onChange={(e) => setSetupCat(e.target.value)} />
            <label htmlFor="damages">Schade opnemen</label>
          </div>
          <div className="add__reports__input__default">
            <input type="radio" id="maintenance" name="report__type" value="maintenance" onChange={(e) => setSetupCat(e.target.value)}  />
            <label htmlFor="maintenance">Achterstallig onderhoud opnemen</label>
          </div>
          <div className="add__reports__input__default">
            <input type="radio" id="installations" name="report__type" value="installations" onChange={(e) => setSetupCat(e.target.value)}  />
            <label htmlFor="installations">Technische installaties inspecteren</label>
          </div>
          <div className="add__reports__input__default">
            <input type="radio" id="modifications" name="report__type" value="modifications" onChange={(e) => setSetupCat(e.target.value)}  />
            <label htmlFor="modifications">Modificaties inventarisen</label>
          </div>
          <input type="submit" value="Inspectie starten" className="reports__button__default" />
        </form>
      </div>}
      {category === "damages" && <Damages category={category} onReportsCategoryReset={handleReportsCategoryReset} />}
      {category === "maintenance" && <Maintenance category={category} onReportsCategoryReset={handleReportsCategoryReset} />}
      {category === "installations" && <Installations category={category} onReportsCategoryReset={handleReportsCategoryReset} />}
      {category === "modifications" && <Modifications category={category} onReportsCategoryReset={handleReportsCategoryReset} />}
    </>
  )
}
