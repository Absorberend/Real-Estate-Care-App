import React, {useEffect, useState} from "react"

import useBaseImg from "../../hooks/useBaseImg";
import useFetch from "../../hooks/useFetch";
import "./Avatar.css";


export default function Avatar({loggedInUser}) {
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
      <div className="avatar__container">
        <form className="avatar__form" onSubmit={handleDamagesSubmit}>
          <div className="report__form__file__type__default">
            <label className="avatar__input__label">Avatar wijzigen:</label>
            <input 
              type="file" 
              accept="image/*" 
              id="report__file__input" 
              onChange={(e) => uploadImage(e)} 
            />
          </div>
          <div className="avatar__avatar__wrapper">
            <img 
              src={srcEncoded ? avatar : loggedInUser[0].avatar} 
              alt="personal avatar" 
              className="avatar__avatar" 
            />
          </div>
          <span className="avatar__user__message">{userMsg}</span>
          <input 
            type="submit" 
            disabled={submitted} 
            value="Avatar wijzigen" 
            className="reports__button__default avatar__input__button" 
          />
        </form>
      </div>
  )
}
