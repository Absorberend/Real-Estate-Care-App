import React, { useState, useEffect } from "react";

import BeatLoader from "react-spinners/BeatLoader";

import useBaseImg from "../../hooks/useBaseImg";
import BackButton from "../BackButton";
import "./ReportsStyling.css";

export default function Maintenance({filteredReport, onReportsModalToggleClick, loading, onSubmit}) {
  const [streetName, setStreetName] = useState(filteredReport.location.split(", ")[0] || "");
  const [postalCode, setPostalCode] = useState(filteredReport.location.split(", ")[1] || "");
  const [city, setCity] = useState(filteredReport.location.split(", ")[2] || "");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(filteredReport.date || "");
  const [maintenanceType, setMaintenanceType] = useState(filteredReport.maintenanceType || "default");
  const [acuteActionRequired, setAcuteActionRequired] = useState(filteredReport.acuteActionRequired || "");
  const [costIndication, setCostIndication] = useState(filteredReport.costIndication || "default");
  const [pictures, setPictures] = useState(filteredReport.pictures || "");
  const { uploadImage, srcEncoded } = useBaseImg();

  const doc = {
    category: "maintenance", 
    location, 
    date, 
    maintenanceType, 
    acuteActionRequired, 
    costIndication, 
    pictures, 
    completed: "true"
  };

  let locationArr = [];

  useEffect(() => {
    if (streetName && postalCode && city) {
      setLocation([]);
      locationArr = [];
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
      <h4 className="reports__header__default">Achterstallig onderhoud opnemen</h4>
      <form className="reports__inspection__form__default"  onSubmit={(e) => onSubmit(e, doc)}>
        <div className="report__form__default">
          <div className="report__form__location__container__default">
            <label>Straatnaam:</label>
            <label>Postcode:</label>
            <label>Plaats:</label>
          </div>
          <div className="report__form__location__default">
            <input 
              type="text" 
              name="maintenance__report" 
              size="25" 
              placeholder="Dummystraat 125" 
              value={streetName} 
              onChange={(e) => setStreetName(e.target.value)} 
              required 
            />
            <input 
              type="text" 
              name="maintenance__report" 
              size="25" 
              placeholder="1234AB" 
              value={postalCode} 
              onChange={(e) => setPostalCode(e.target.value)} 
              required 
            />
            <input 
              type="text" 
              name="maintenance__report" 
              size="25" 
              placeholder="Amsterdam" 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
              required 
            />
          </div>
        </div>
        <div className="report__form__default">
          <label>Datum:</label>
          <input 
            type="datetime-local" 
            name="maintenance__report" 
            value={date} onChange={(e) => setDate(e.target.value)} 
            required />
        </div>
      
        <div className="report__form__default">
          <label>Soort onderhoud:</label>
          <select 
            name="maintenance__report" 
            value={maintenanceType} 
            onChange={(e) => setMaintenanceType(e.target.value)} 
            className="report__select__default" 
            required
          >
            <option value="default" disabled>Maak je keuze</option>
            <option value="schilderwerk">Schilderwerk</option>
            <option value="houtrot">Houtrot</option>
            <option value="elektra">Elektra</option>
            <option value="leidingwerk">Leidingwerk</option>
            <option value="beglazing">Beglazing</option>
          </select>
        </div>
        <div className="report__form__default">
          <label>Acute actie vereist:</label>
          <div className="report__form__radio__default__container">
            <div className="report__form__radio__default">
              <label>Ja</label>
              <input 
                type="radio" 
                name="maintenance__report__acute" 
                checked={acuteActionRequired === "ja"} 
                value="ja" 
                onChange={(e) => setAcuteActionRequired(e.target.value)} 
              />
            </div>
            <div className="report__form__radio__default">
              <label>Nee</label>
              <input 
                type="radio" 
                name="maintenance__report__acute" 
                checked={acuteActionRequired === "nee"} 
                value="nee" 
                onChange={(e) => setAcuteActionRequired(e.target.value)} 
              />
            </div>
          </div>
        </div>
        <div className="report__form__default">
          <label>Kostenindicatie:</label>
          <select 
            name="maintenance__report" 
            value={costIndication} 
            onChange={(e) => setCostIndication(e.target.value)} 
            className="report__select__default" 
            required
          >
            <option value="default" disabled>Maak je keuze</option>
            <option value="0-500">&euro; 0-500</option>
            <option value="500-1500">&euro; 500-1.500</option>
            <option value="1500+">&euro; 1.500+</option>
          </select>
        </div>
        <div className="report__form__file__type__default">
          <label>Foto toevoegen:</label>
          <input 
            type="file" 
            accept="image/*" 
            id="report__file__input" 
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
