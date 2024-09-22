import ReactDOM from "react-dom/client";
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
// import About from './components/About';
import React, {useState} from 'react';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default function App() {
  const [mode, setmode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(()=> {
      setAlert(null);
    }, 2000)
  }

  let toggleMode = () => {
    if(mode === 'light') {
      setmode('dark');
      document.body.style.backgroundColor='#131517';
      showAlert("Dark mode has been enabled", "success");
    }
    else{
      setmode('light');
      document.body.style.backgroundColor='white';
      showAlert("Light mode has been enabled", "success")
    }
  };

  return (
    <>
    {/* <Router> */}
      <Navbar title="Textify" mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert} />
      <TextForm heading="Enter the text to analyze" mode={mode} showAlert={showAlert}  />
      <div className="container my-3">

          {/* <Routes>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={<TextForm heading="Enter the text to analyze" mode={mode} showAlert={showAlert} />} />
          </Routes> */}


          </div>
      {/* </Router> */}
    </>
  )
}
