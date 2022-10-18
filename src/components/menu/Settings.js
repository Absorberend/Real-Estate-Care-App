import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import BackButton from '../BackButton';
import "./Settings.css";


export default function Settings({loggedInUser, onLogout}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [username, setUsername] = useState("");
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
        navigate('/');
      }, 3000);
    }

  }, [passwordMatch, passwordChanged])

  const handleDamagesSubmit = async (e) => {
    e.preventDefault();

    Object.entries(loggedInUser)[0].filter(user => user.password === oldPassword).length > 0 ? setPasswordMatch(true) : setPasswordMatch(false);

    if (passwordMatch === false) {
      return;
    } 
  }

  return (
    <div className="settings__container">
      <BackButton />
      <h2>Instellingen</h2>
      <h4>Watchwoord wijzigen:</h4>

      <form  onSubmit={handleDamagesSubmit} className="settings__form">

        <input hidden type="text" name="username" autoComplete="username" value={loggedInUser[0].loginName} onChange={(e) => setUsername(e.target.value)} />

        <div>
          <label>Oude wachtwoord:</label>
          <div>
            <input type="password" name="oude__wachtwoord" size="42" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} autoComplete="new-password"/>
          </div>
        </div>
        
        <div>
          <label>Nieuwe wachtwoord:</label>
          <div>
            <input type="password" name="nieuwe__wachtwoord" size="42" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} autoComplete="new-password"/>
          </div>
        </div>

        <span>{userMsg}</span>

        <input type="submit" value="Wijzigingen doorvoeren" disabled={passwordChanged} className="reports__button__default" />
      </form>
    </div>
  )
}
