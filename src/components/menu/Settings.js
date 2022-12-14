import React, {useState, useEffect} from "react"

import { useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import BackButton from "../BackButton";
import Avatar from "./Avatar";
import "./Settings.css";


export default function Settings({loggedInUser, onLogout}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [username, setUsername] = useState(loggedInUser[0].loginName);
  const [userFullName, setUserFullName] = useState(loggedInUser[0].firstName + " " + loggedInUser[0].lastName)
  const [userMsg, setUserMsg] = useState("");
  const {put} = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if(passwordMatch === false) {
      setUserMsg("Het door u ingevoerde (oude) wachtwoord komt niet overeen met het bij ons bekende wachtwoord.");
    } else if (passwordMatch === true) {
      setUserMsg("Uw wachtwoord is gewijzigd, u zult worden uitgelogd");
      put("users", loggedInUser[0].id, {
        password: newPassword
      });
      setPasswordChanged(true);
      setTimeout(() => {
        onLogout();
        navigate("/");
      }, 3000);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordMatch, passwordChanged])

  const handleDamagesSubmit = async (e) => {
    e.preventDefault();

    Object.entries(loggedInUser)[0].filter(user => user.password === oldPassword)
      .length > 0 ? setPasswordMatch(true) : setPasswordMatch(false);

    if (passwordMatch === false) {
      return;
    } 
  }

  return (
    <div className="settings__container">
      <BackButton />
      <h2>Instellingen</h2>

      <form  onSubmit={handleDamagesSubmit} className="settings__form">

        <div>
          <div>
            <label htmlFor="settings__username">Inlog naam:</label>
          </div>
          <input 
            disabled 
            type="text" 
            name="username" 
            id="settings__username"
            autoComplete="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div>
          <div>
            <label htmlFor="settings__fullname">Volledige naam:</label>
          </div>
          <input 
            disabled 
            type="text" 
            name="username" 
            id="settings__fullname"
            autoComplete="username" 
            value={userFullName} 
            onChange={(e) => setUserFullName(e.target.value)} 
          />
        </div>

        <h3>Watchwoord wijzigen:</h3>
        <div>
          <label htmlFor="settings__old__password">Oude wachtwoord:</label>
          <div>
            <input 
              type="password" 
              name="oude__wachtwoord"
              id="settings__old__password"
              size="42" 
              value={oldPassword} 
              onChange={(e) => setOldPassword(e.target.value)} 
              autoComplete="new-password" 
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="settings__new__password">Nieuwe wachtwoord:</label>
          <div>
            <input 
              type="password" 
              name="nieuwe__wachtwoord" 
              id="settings__new__password"
              size="42" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              autoComplete="new-password" 
            />
          </div>
        </div>

        <span>{userMsg}</span>

        <input 
          type="submit" 
          value="Wachtwoord wijzigen" 
          disabled={passwordChanged} 
          className="reports__button__default" 
        />
      </form>
      <Avatar loggedInUser={loggedInUser} />
    </div>
  )
}
