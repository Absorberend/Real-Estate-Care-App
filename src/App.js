import React, {useState, useEffect} from 'react';
import {HashRouter, Routes, Route} from 'react-router-dom';
import useDetectKeyboardOpen from "use-detect-keyboard-open";


import './App.css';

import useFetch from './hooks/useFetch';

import CompletedReports from "./components/menu/CompletedReports.js";
import AddReports from "./components/menu/AssignedReports.js";
import KnowledgeBase from "./components/menu/KnowledgeBase.js";
import Settings from "./components/menu/Settings.js";
import LoginPage from './components/LoginPage';
import ErrorPage from './components/ErrorPage';
import TopBar from "./components/TopBar.js";
import SideMenu from './components/SideMenu';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import EditReports from "./components/menu/EditReports.js";
import ReportsBackButtonModal from "./components/ReportsBackButtonModal.js";


let authValue = Math.floor(Math.random() * 1000000).toString(); //auth code for demo purposes only

function App() {
  const [sideMenuToggle, setSideMenuToggle] = useState(false);
  const [outsideClick, setOutsideClick] = useState(false);
  const [loggedInUser, setloggedInUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")) || []);
  const [unAuthLogIn, setunAuthLogIn ] = useState(localStorage.getItem("unAuthLogin") === "true" ? true : false);
  const [authLogIn, setAuthLogIn] = useState(localStorage.getItem("authLogin") === "true" ? true : false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [redirectURL, setRedirectURL] = useState(null);

  const {data, users} = useFetch();
  const isKeyboardOpen = useDetectKeyboardOpen(300, null);

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser)); 
    
  }, [loggedInUser])

  useEffect(() => {
    localStorage.setItem("unAuthLogin", unAuthLogIn); 
    
  }, [unAuthLogIn])

  useEffect(() => {
    localStorage.setItem("authLogin", authLogIn); 
    
  }, [authLogIn])

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

  const handleReportsModalToggleClick = (redirectURL) => {
      setRedirectURL(redirectURL);
      setReportModalOpen(prevReportModalOpen => !prevReportModalOpen);
  }

  return (
    <>
      <HashRouter>
        {unAuthLogIn && authLogIn && <>
          <header className="app__header">
            <TopBar onSideMenuToggleClick={handleSideMenuToggleClick} onSideMenuClose={handleSideMenuClose} loggedInUser={loggedInUser} onReportsModalToggleClick={handleReportsModalToggleClick} data={data} />
            {sideMenuToggle && <SideMenu onSideMenuToggleClick={handleSideMenuToggleClick} onOutsideClick={handleOutsideClick} onLogOut={handleLogOut} reportModalOpen={reportModalOpen} onReportsModalToggleClick={handleReportsModalToggleClick} data={data} />}
            <div className="app__reports__modal__container__wrapper">
                {reportModalOpen && <ReportsBackButtonModal url={redirectURL} onReportsModalToggleClick={handleReportsModalToggleClick}/>}
            </div>
          </header>
          <main className="app__main">
            <Routes>
              <Route path="/" element={<HomePage loggedInUser={loggedInUser} data={data} onCategoryDisplay={handleCategoryDisplay} />} />
              <Route path="/AssignedReports" element={<AddReports data={data} loggedInUser={loggedInUser} onCategoryDisplay={handleCategoryDisplay} />} />
              <Route path="/CompletedReports" element={<CompletedReports data={data} onCategoryDisplay={handleCategoryDisplay} />}  />
              <Route path="/KnowledgeBase" element={<KnowledgeBase data={data} />}  />       
              <Route path="/Settings" element={<Settings loggedInUser={loggedInUser} onLogout={handleLogOut} />}  />
              <Route path="/EditReports/:reportId" element={<EditReports data={data} onReportsModalToggleClick={handleReportsModalToggleClick} />}  />           
              <Route path="*" element={<ErrorPage unAuthLogIn={unAuthLogIn} authLogIn={authLogIn} onReportsModalToggleClick={handleReportsModalToggleClick}/>}  />    
            </Routes>
          </main>
          {isKeyboardOpen ? "" : <footer className="app__footer">
            <NavBar onSideMenuClose={handleSideMenuClose} data={data} reportModalOpen={reportModalOpen} onReportsModalToggleClick={handleReportsModalToggleClick}/>
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
