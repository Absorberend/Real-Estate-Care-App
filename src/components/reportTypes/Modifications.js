import React, { useState, useEffect } from "react";

import BeatLoader from "react-spinners/BeatLoader";

import useBaseImg from "../../hooks/useBaseImg";
import BackButton from "../BackButton";
import "./ReportsStyling.css";

export default function Modifications({filteredReport, onReportsModalToggleClick, loading, onSubmit}) {
  const [streetName, setStreetName] = useState(filteredReport.location.split(", ")[0] || "");
  const [postalCode, setPostalCode] = useState(filteredReport.location.split(", ")[1] || "");
  const [city, setCity] = useState(filteredReport.location.split(", ")[2] || "");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(filteredReport.date || "");
  const [modificationEncountered, setModificationEncountered] = useState(filteredReport.modificationEncountered || "");
  const [carriedOutBy, setCarriedOutBy] = useState(filteredReport.carriedOutBy || "default");
  const [descriptionModification, setDescriptionModification] = useState(filteredReport.descriptionModification || "");
  const [action, setAction] = useState(filteredReport.action || "default");
  const [description, setDescription] = useState(filteredReport.description || "");
  const { uploadImage, srcEncoded } = useBaseImg();

  const doc = {
    category: "modifications", 
    location, 
    date, 
    modificationEncountered, 
    carriedOutBy, 
    descriptionModification, 
    action, 
    description, 
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
      setModificationEncountered(srcEncoded);
    }
  }, [srcEncoded]) 

  return (
    <section className="reports__container__default">
      <BackButton onReportsModalToggleClick={onReportsModalToggleClick} />
      <h2 className="reports__header__default">Modificaties inventariseren</h2>
      <form className="reports__inspection__form__default" onSubmit={(e) => onSubmit(e, doc)}>
        <div className="report__form__default">
          <div className="report__form__location__container__default">
            <label htmlFor="modifications__report__street__name">Straatnaam:</label>
            <label htmlFor="modifications__report__postal__code">Postcode:</label>
            <label htmlFor="modifications__report__city">Plaats:</label>
          </div>
          <div className="report__form__location__default">
            <input 
              type="text" 
              name="modifications__report" 
              id="modifications__report__street__name" 
              size="25" 
              placeholder="Dummystraat 125" 
              value={streetName} 
              onChange={(e) => setStreetName(e.target.value)} 
              required 
            />
            <input 
              type="text" 
              name="modifications__report" 
              id="modifications__report__postal__code" 
              size="25" 
              placeholder="1234AB" 
              value={postalCode} 
              onChange={(e) => setPostalCode(e.target.value)} 
              required 
            />
            <input 
              type="text" 
              name="modifications__report" 
              id="modifications__report__city" 
              size="25" 
              placeholder="Amsterdam" 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
              required 
            />
          </div>
        </div>
        <div className="report__form__default">
          <label htmlFor="modifications__report__date">Datum:</label>
          <input 
            type="datetime-local" 
            name="modifications__report" 
            id="modifications__report__date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>
        <div className="report__form__file__type__default">
          <label htmlFor="modifications__file__input">Gedocumenteerde modificaties:</label>
          <input 
            type="file" 
            accept="image/*" 
            id="modifications__file__input" 
            onChange={(e) => uploadImage(e)} 
          />
          <span>
            <span style={{fontWeight: "600", fontSize: "1em"}}>Tip: </span>
            Alvorens u een foto selecteert zorg ervoor dat de fotogallerij op uw telefoon volledig ingeladen is.
          </span>
        </div>
        <div className="report__form__default">
          <label htmlFor="modifications__report__carried__out__by">Uitgevoerd door:</label>
          <select 
            name="modifications__report" 
            id="modifications__report__carried__out__by"
            value={carriedOutBy} 
            onChange={(e) => setCarriedOutBy(e.target.value)} 
            className="report__select__default" 
            required
          >
            <option value="default" disabled>Maak je keuze</option>
            <option value="huurder">Huurder</option>
            <option value="aannemer">Aannemer</option>
            <option value="onbekend">Onbekend</option>
          </select>
        </div>
        <div className="report__form__description__default">
          <label htmlFor="modifications__report__description__modification">Beschrijving modificaties:</label>
          <textarea 
            rows="4" 
            cols="42" 
            value={descriptionModification} 
            id="modifications__report__description__modification"
            onChange={(e) => setDescriptionModification(e.target.value)} 
          />
        </div>
        <div className="report__form__default">
          <label htmlFor="modifications__report__action">Te ondernemen actie:</label>
          <select 
            name="modifications__report" 
            value={action} 
            id="modifications__report__action"
            onChange={(e) => setAction(e.target.value)} 
            className="report__select__default" 
            required
          >
            <option value="default" disabled>Maak je keuze</option>
            <option value="accepteren">Accepteren</option>
            <option value="keuren">Keuren</option>
            <option value="verwijderen">Verwijderen</option>
            <option value="aanpassen">Aanpassen en keuren</option>
          </select>
        </div>
        <div className="report__form__description__default">
          <label htmlFor="modifications__report__description">Opmerkingen:</label>
          <textarea 
            rows="4" 
            cols="42" 
            id="modifications__report__description"
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
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
