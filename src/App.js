import React, {useState, useEffect} from 'react';
import {HashRouter, Routes, Route} from 'react-router-dom';
import useDetectKeyboardOpen from "use-detect-keyboard-open";

import './App.css';

import useFetch from './hooks/useFetch';

import CompletedReports from "./components/menu/CompletedReports.js";
import AddReports from "./components/menu/AssignedReports.js";
import KnowledgeBase from "./components/menu/KnowledgeBase.js";
import Settings from "./components/menu/Settings.js";
import Profile from "./components/menu/Profile.js";
import LoginPage from './components/LoginPage';
import ErrorPage from './components/ErrorPage';
import TopBar from "./components/TopBar.js";
import SideMenu from './components/SideMenu';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import EditReports from "./components/menu/EditReports.js";

let authValue = Math.floor(Math.random() * 1000000).toString(); //auth code for demo purposes only

function App() {
  const [sideMenuToggle, setSideMenuToggle] = useState(false);
  const [outsideClick, setOutsideClick] = useState(false);
  const [loggedInUser, setloggedInUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")) || []);
  const [unAuthLogIn, setunAuthLogIn ] = useState(localStorage.getItem("unAuthLogin") === "true" ? true : false);
  const [authLogIn, setAuthLogIn] = useState(localStorage.getItem("authLogin") === "true" ? true : false);
  const [loginFailed, setLoginFailed] = useState(false);
  const {data, users} = useFetch();
  const isKeyboardOpen = useDetectKeyboardOpen();

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser)); 
    
  }, [loggedInUser])

  useEffect(() => {
    localStorage.setItem("unAuthLogin", unAuthLogIn); 
    
  }, [unAuthLogIn])

  useEffect(() => {
    localStorage.setItem("authLogin", authLogIn); 
    
  }, [authLogIn])

  const handleOutsideClick = () => {
    setOutsideClick(prevOutsideClick => !prevOutsideClick);
  }

  const handleSideMenuToggleClick = () => {
    if (!outsideClick) {
      setSideMenuToggle(prevSideMenuToggle => !prevSideMenuToggle);
    }
  }

  const handleSideMenuClose = () => {
    setSideMenuToggle(false);
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const nameValue = e.target[`username`].value;
    const passValue = e.target[`password`].value;
    const userLogged = users.filter(user => user.loginName === nameValue && user.password === passValue);

    if (userLogged[0]) {
      setloggedInUser({...userLogged});
      setunAuthLogIn(true);
      setLoginFailed(false);
    } else {
      setLoginFailed(true);
    }
  }

  const handleAuthSubmit = (e) => {
    e.preventDefault();

    const inputAuthValue = e.target[`auth`].value;

    if(authValue === inputAuthValue) {
      setAuthLogIn(true);
      setLoginFailed(false);
    } else {
      setLoginFailed(true);
    }
  }

  const handleLogOut = () => {
    setloggedInUser([]);
    setunAuthLogIn(false);
    setAuthLogIn(false);
    setSideMenuToggle(false);
    authValue = Math.floor(Math.random() * 1000000).toString();
  }

  const handleCategoryDisplay = (category) => {
    if (category === 'damages') {
      return 'Schade';
    } else if (category === 'modifications') {
      return 'Modificaties';
    } else if (category === 'installations') {
      return 'Installaties';
    } else if (category === 'maintenance') {
      return 'Onderhoud';
    }
  }

  return (
    <>
      <HashRouter>
        {unAuthLogIn && authLogIn && <>
          <header className="app__header">
            <TopBar onSideMenuToggleClick={handleSideMenuToggleClick} onSideMenuClose={handleSideMenuClose} loggedInUser={loggedInUser} />
            {sideMenuToggle && <SideMenu onSideMenuToggleClick={handleSideMenuToggleClick} onOutsideClick={handleOutsideClick} onLogOut={handleLogOut} />}
          </header>
          <main className="app__main">
            <Routes>
              <Route path="/" element={<HomePage loggedInUser={loggedInUser} data={data} onCategoryDisplay={handleCategoryDisplay} />} />
              <Route path="/AssignedReports" element={<AddReports data={data} loggedInUser={loggedInUser} onCategoryDisplay={handleCategoryDisplay} />} />
              <Route path="/CompletedReports" element={<CompletedReports data={data} onCategoryDisplay={handleCategoryDisplay} />}  />
              <Route path="/KnowledgeBase" element={<KnowledgeBase data={data} />}  />       
              <Route path="/Settings" element={<Settings loggedInUser={loggedInUser} onLogout={handleLogOut} />}  />
              <Route path="/Profile" element={<Profile loggedInUser={loggedInUser} />}  />
              <Route path="/EditReports/:reportId" element={<EditReports data={data} />}  />           
              <Route path="*" element={<ErrorPage unAuthLogIn={unAuthLogIn} authLogIn={authLogIn} />}  />    
            </Routes>
          </main>
          {isKeyboardOpen ? "" : <footer className="app__footer">
            <NavBar onSideMenuClose={handleSideMenuClose} />
          </footer>}
        </>}
        {!authLogIn && <>
          <Routes>
            <Route path="/" element={<LoginPage onLoginSubmit={handleLoginSubmit} unAuthLogIn={unAuthLogIn} authValue={authValue} onAuthSubmit={handleAuthSubmit} loginFailed={loginFailed} />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </>}
      </HashRouter>
    </>
  );
}

export default App;
