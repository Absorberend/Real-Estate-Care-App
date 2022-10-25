import React, { useState, useEffect } from "react";

import BeatLoader from "react-spinners/BeatLoader";

import useBaseImg from "../../hooks/useBaseImg";
import BackButton from "../BackButton";
import "./ReportsStyling.css";

export default function Installations({filteredReport, onReportsModalToggleClick, loading, onSubmit}) {
  const [streetName, setStreetName] = useState(filteredReport.location.split(", ")[0] || "");
  const [postalCode, setPostalCode] = useState(filteredReport.location.split(", ")[1] || "");
  const [city, setCity] = useState(filteredReport.location.split(", ")[2] || "");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(filteredReport.date || "");
  const [approved, setApproved] = useState(filteredReport.approved || "");
  const [installationType, setInstallationType] = useState(filteredReport.installationType || "default");
  const [reportedMalfunction, setReportedMalfunction] = useState(filteredReport.reportedMalfunction || "");
  const [testProcedure, setTestProcedure] = useState(filteredReport.testProcedure || "");
  const [description, setDescription] = useState(filteredReport.description || "");
  const [pictures, setPictures] = useState(filteredReport.pictures || "");
  const { uploadImage, srcEncoded } = useBaseImg();
  const sanitizeUrl = require("@braintree/sanitize-url").sanitizeUrl;

  const doc = {
    category: "installations", 
    location, 
    date, 
    installationType, 
    reportedMalfunction, 
    testProcedure, 
    approved, 
    description, 
    pictures, 
    completed: "true"
  };

  useEffect(() => {
    if (streetName && postalCode && city) {
      setLocation([]);
      let locationArr = [];
      locationArr.push(streetName, postalCode, city);
      setLocation(locationArr.join(", "));   
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streetName, postalCode, city])

  useEffect(() => {
    if (srcEncoded !== "") {
        setPictures(srcEncoded);
    }
  }, [srcEncoded]) 


  return (
    <section className="reports__container__default">
      <BackButton onReportsModalToggleClick={onReportsModalToggleClick} />
      <h2 className="reports__header__default">Technische installaties inspecteren</h2>
      <form className="reports__inspection__form__default" onSubmit={(e) => onSubmit(e, doc)}>
        <div className="report__form__default">
          <div className="report__form__location__container__default">
            <label htmlFor="installations__report__street__name">Straatnaam:</label>
            <label htmlFor="installations__report__postal__code">Postcode:</label>
            <label htmlFor="installations__report__city">Plaats:</label>
          </div>
          <div className="report__form__location__default">
            <input 
              type="text" 
              name="installations__report" 
              id="installations__report__street__name" 
              size="25" 
              placeholder="Dummystraat 125"  
              value={streetName} 
              onChange={(e) => setStreetName(e.target.value)} 
              required 
            />
            <input 
              type="text" 
              name="installations__report" 
              id="installations__report__postal__code" 
              size="25" 
              placeholder="1234AB" 
              value={postalCode} 
              onChange={(e) => setPostalCode(e.target.value)} 
              required 
            />
            <input 
              type="text" 
              name="installations__report" 
              id="installations__report__city" 
              size="25" 
              placeholder="Amsterdam" 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
              required 
            />
          </div>
        </div>
        <div className="report__form__default">
          <label htmlFor="installations__report__date">Datum:</label>
          <input 
            type="datetime-local" 
            name="installations__report" 
            id="installations__report__date"
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>
        <div className="report__form__default">
          <label htmlFor="installations__report__installation__type">Soort installatie:</label>
          <select 
            name="installations__report"
            id="installations__report__installation__type" 
            value={installationType} 
            onChange={(e) => setInstallationType(e.target.value)} 
            className="report__select__default" 
            required
          >
            <option value="default" disabled>Maak je keuze</option>
            <option value="koeling">Koeling</option>
            <option value="verwarming">Verwarming</option>
            <option value="luchtverversing">Luchtverversing</option>
            <option value="elektra">Elektra</option>
            <option value="beveiliging">Beveiliging</option>
          </select>
        </div>
        <div className="report__form__description__default">
          <label htmlFor="installations__report__reported__malfunction">Gemelde storing(en):</label>
          <textarea 
            rows="4" 
            cols="42"
            name="installations__report"
            id="installations__report__reported__malfunction" 
            value={reportedMalfunction} 
            onChange={(e) => setReportedMalfunction(e.target.value)} 
          />
        </div>
        <div className="report__form__description__default">
          <label htmlFor="installations__report__test__procedure">Testprocedure:</label>
          <div className="report__form__test__procedure__default">
            <input 
              type="text" 
              name="installations__report" 
              id="installations__report__test__procedure"
              size="42" 
              placeholder="https://www.testprocedure.nl/elektra" 
              value={testProcedure} 
              onChange={(e) => setTestProcedure(sanitizeUrl(e.target.value))} 
            />
          </div>
        </div>
        <div className="report__form__default">
          <label>Goedgekeurd:</label>
          <fieldset className="report__form__radio__default__container">
            <legend>Goedgekeurd</legend>
            <div className="report__form__radio__default">
              <label htmlFor="installations__report__approed__yes" >Ja</label>
              <input 
                type="radio" 
                name="installations__report" 
                id="installations__report__approed__yes" 
                checked={approved === "ja"} 
                value="ja" 
                onChange={(e) => setApproved(e.target.value)} 
              />
            </div>
            <div className="report__form__radio__default">
              <label htmlFor="installations__report__approed__no">Nee</label>
              <input 
                type="radio" 
                name="installations__report" 
                id="installations__report__approed__no" 
                checked={approved === "nee"} 
                value="nee" 
                onChange={(e) => setApproved(e.target.value)} 
              />
            </div>
          </fieldset>
        </div>
        <div className="report__form__description__default">
          <label htmlFor="installations__report__description">Opmerkingen:</label>
          <textarea 
            rows="4" 
            cols="42" 
            name="installations__report"
            id="installations__report__description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <div className="report__form__file__type__default">
          <label htmlFor="installations__file__input">Foto toevoegen:</label>
          <input 
            type="file" 
            accept="image/*" 
            id="installations__file__input" 
            onChange={(e) => uploadImage(e)} 
          />
          <span>
            <span style={{fontWeight: "600", fontSize: "1em"}}>Tip: </span>
            Alvorens u een foto selecteert zorg ervoor dat de fotogallerij op uw telefoon volledig ingeladen is.
          </span>
        </div>
        <div className="reports__submit__button__wrapper">
          <input 
            type="submit" 
            value={loading ? "" : "Inspectie registreren"} 
            disabled={loading} 
            className="reports__button__default" 
          />
          <div className="reports__submit__button__loader">
            <BeatLoader loading={loading} />
          </div>
        </div>
      </form>
    </section>
  )
}
