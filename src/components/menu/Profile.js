import React, {useEffect, useState} from 'react'
import useBaseImg from '../../hooks/useBaseImg';
import useFetch from '../../hooks/useFetch';

import BackButton from "../BackButton";
import "./Profile.css";



export default function Profile({loggedInUser}) {
  const { uploadImage, srcEncoded } = useBaseImg();
  const { put } = useFetch();
  const [avatar, setAvatar] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (srcEncoded !== "") {
      setAvatar(srcEncoded);
    }
  }, [srcEncoded]) 

  const handleDamagesSubmit = async (e) => {
    e.preventDefault();

    if (avatar) {
      put("users", loggedInUser[0].id, {
        avatar: avatar
      });
      setUserMsg("Uw avatar is wijzigd, log opnieuw in om de wijziging te zien.");
      setSubmitted(true);
    }
  }
      


  return (
      <div className="profile__container">
        <BackButton />
        <h2>Profiel</h2>
        <form className="profile__form" onSubmit={handleDamagesSubmit}>
            <div className="report__form__file__type__default">
            <label>Avatar wijzigen:</label>
            <input type="file" accept="image/*" id="report__file__input" onChange={(e) => uploadImage(e)} />
          </div>
          <div className="profile__avatar__wrapper">
            <img src={srcEncoded ? avatar : loggedInUser[0].avatar} alt="personal avatar" className="profile__avatar"/>
          </div>
          <input type="submit" disabled={submitted} value="Wijziging doorvoeren" className="reports__button__default" />
        </form>
        <span>{userMsg}</span>
      </div>
  )
}
