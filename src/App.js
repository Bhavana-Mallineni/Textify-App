import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import React, {useState, useRef } from 'react';
import Alert from './components/Alert';

export default function App() {
  const [mode, setmode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    if(alertTimeout) {
      clearTimeout(alertTimeout);
    }

    alertTimeout = setTimeout(()=> {
      setAlert(null);
    }, 2000)
  }

  let alertTimeout = null;

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
      <Navbar title="Textify" mode={mode} toggleMode={toggleMode}/>
      <Alert alert={alert} setAlert={setAlert} />
      <TextForm heading="Enter the text to analyze" mode={mode} showAlert={showAlert}  />
    </>
  )
}
