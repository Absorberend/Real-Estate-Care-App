import React, { useState, useEffect } from 'react';
import useBaseImg from '../../hooks/useBaseImg';
import useFetch from '../../hooks/useFetch';

import "./ReportsStyling.css";
import BackButton from '../BackButton';
import { useNavigate } from 'react-router-dom';

export default function Maintenance({category, onReportsCategoryReset, filteredReport, editReport, reportId, onEditStateClick}) {
  const [editOn, setEditOn] = useState(false);
  const [streetName, setStreetName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [maintenanceType, setMaintenanceType] = useState("default");
  const [acuteActionRequired, setAcuteActionRequired] = useState("");
  const [costIndication, setCostIndication] = useState("default");
  const [pictures, setPictures] = useState("");
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
      setCostIndication(filteredReport.costIndication);
      setMaintenanceType(filteredReport.maintenanceType);
      setAcuteActionRequired(filteredReport.acuteActionRequired);
      setPictures(filteredReport.pictures);
      setEditOn(editReport);
    }

  }, [editReport])

  useEffect(() => {
    if (streetName && postalCode && city) {
      locationArr.push(streetName, postalCode, city);
      setLocation(locationArr.join(", "));
    }
  }, [streetName, postalCode, city])

  useEffect(() => {
    if (srcEncoded !== "") {
        setPictures(srcEncoded);
    } 
  }, [srcEncoded]) 

  const handleDamagesSubmit = async (e) => {
    e.preventDefault();

    const doc = {category: "maintenance", location, date, maintenanceType, acuteActionRequired, costIndication, pictures};

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
    setMaintenanceType("default")
    setAcuteActionRequired("");
    setCostIndication("default");
    setPictures("");
    navigate('/');
  }

  return (
    <section className="reports__container__default">
      <BackButton />
      <h4 className="reports__header__default">Achterstallig onderhoud opnemen</h4>
      <form className="reports__inspection__form__default"  onSubmit={handleDamagesSubmit}>
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
          <input type="datetime-local" name="maintenance__report" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
      
        <div className="report__form__default">
          <label>Soort onderhoud:</label>
          <select name="maintenance__report" value={maintenanceType} onChange={(e) => setMaintenanceType(e.target.value)} className="report__select__default" required>
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
              <input type="radio" name="maintenance__report__acute" checked={acuteActionRequired === "ja"} value="ja" onChange={(e) => setAcuteActionRequired(e.target.value)} />
            </div>
            <div className="report__form__radio__default">
              <label>Nee</label>
              <input type="radio" name="maintenance__report__acute" checked={acuteActionRequired === "nee"} value="nee" onChange={(e) => setAcuteActionRequired(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="report__form__default">
          <label>Kostenindicatie:</label>
          <select name="maintenance__report" value={costIndication} onChange={(e) => setCostIndication(e.target.value)} className="report__select__default" required>
            <option value="default" disabled>Maak je keuze</option>
            <option value="0-500">&euro; 0-500</option>
            <option value="500-1500">&euro; 500-1.500</option>
            <option value="1500+">&euro; 1.500+</option>
          </select>
        </div>
        <div className="report__form__file__type__default">
          <label>Foto toevoegen:</label>
          <input type="file" accept="image/*" id="report__file__input" onChange={(e) => uploadImage(e)} />
        </div>
        <input type="submit" value="Inspectie registreren" className="reports__button__default" />
      </form>
    </section>
  )
}
