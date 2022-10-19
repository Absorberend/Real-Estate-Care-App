import React, { useState, useEffect } from 'react';
import useBaseImg from '../../hooks/useBaseImg';
import useFetch from '../../hooks/useFetch';

import "./ReportsStyling.css";
import BackButton from '../BackButton';
import { useNavigate } from 'react-router-dom';

export default function Modifications({category, onReportsCategoryReset, filteredReport, editReport, reportId, onEditStateClick}) {
  const [editOn, setEditOn] = useState(false);
  const [streetName, setStreetName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [modificationEncountered, setModificationEncountered] = useState("");
  const [carriedOutBy, setCarriedOutBy] = useState("default");
  const [descriptionModification, setDescriptionModification] = useState("");
  const [action, setAction] = useState("default");
  const [description, setDescription] = useState("");
  const { post, put } = useFetch();
  const { uploadImage, srcEncoded } = useBaseImg();
  const navigate = useNavigate();

  let locationArr = [];

  useEffect(() => {
    if (editReport) {
      setStreetName(filteredReport.location.split(', ')[0]);
      setPostalCode(filteredReport.location.split(', ')[1]);
      setCity(filteredReport.location.split(', ')[2]);
      setLocation(filteredReport.location);
      setDate(filteredReport.date);
      setAction(filteredReport.action);
      setCarriedOutBy(filteredReport.carriedOutBy);
      setDescriptionModification(filteredReport.descriptionModification);
      setModificationEncountered(filteredReport.modificationEncountered);
      setDescription(filteredReport.description);
      setEditOn(editReport);
    }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editReport])

  useEffect(() => {
    if (streetName && postalCode && city) {
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

  const handleDamagesSubmit = async (e) => {
    e.preventDefault();

    const doc = {category: "modifications", location, date, modificationEncountered, carriedOutBy, descriptionModification, action, description};

    if (!editOn) {
      post("reports", doc);
      onReportsCategoryReset();
    } else if (editReport) {
      put("reports", reportId, doc);
      onEditStateClick();
    }

    setLocation("");
    setStreetName("");
    setPostalCode("");
    setCity("");
    setDate("");
    setModificationEncountered("");
    setCarriedOutBy("default");
    setDescriptionModification("");
    setAction("default");
    setDescription("");
    navigate('/');
  }


  return (
    <section className="reports__container__default">
      <BackButton />
      <h4 className="reports__header__default">Modificaties inventariseren</h4>
      <form className="reports__inspection__form__default" onSubmit={handleDamagesSubmit}>
        <div className="report__form__default">
          <div className="report__form__location__container__default">
            <label>Straatnaam:</label>
            <label>Postcode:</label>
            <label>Plaats:</label>
          </div>
          <div className="report__form__location__default">
            <input type="text" name="modifications__report" size="25" placeholder="Dummystraat 125" value={streetName} onChange={(e) => setStreetName(e.target.value)} required />
            <input type="text" name="modifications__report" size="25" placeholder="1234AB" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
            <input type="text" name="modifications__report" size="25" placeholder="Amsterdam" value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>
        </div>
        <div className="report__form__default">
          <label>Datum:</label>
          <input type="datetime-local" name="modifications__report" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="report__form__file__type__default">
          <label>Gedocumenteerde modificaties:</label>
          <input type="file" accept="image/*" id="report__file__input" onChange={(e) => uploadImage(e)} />
        </div>
        <div className="report__form__default">
          <label>Uitgevoerd door:</label>
          <select name="modifications__report" value={carriedOutBy} onChange={(e) => setCarriedOutBy(e.target.value)} className="report__select__default" required>
            <option value="default" disabled>Maak je keuze</option>
            <option value="huurder">Huurder</option>
            <option value="aannemer">Aannemer</option>
            <option value="onbekend">Onbekend</option>

          </select>
        </div>
        <div className="report__form__description__default">
          <label>Beschrijving modificaties:</label>
          <textarea rows="4" cols="42" value={descriptionModification} onChange={(e) => setDescriptionModification(e.target.value)} />
        </div>
        <div className="report__form__default">
          <label>Te ondernemen actie:</label>
          <select name="modifications__report" value={action} onChange={(e) => setAction(e.target.value)} className="report__select__default" required>
            <option value="default" disabled>Maak je keuze</option>
            <option value="accepteren">Accepteren</option>
            <option value="keuren">Keuren</option>
            <option value="verwijderen">Verwijderen</option>
            <option value="aanpassen">Aanpassen en keuren</option>
          </select>
        </div>
        <div className="report__form__description__default">
          <label>Opmerkingen:</label>
          <textarea rows="4" cols="42" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <input type="submit" value="Inspectie registreren" className="reports__button__default" />
      </form>
    </section>
  )
}
