import React, {useState} from 'react'

export default function TextForm(props) {

    const [text, setText] = useState("");
    const [findWord, setFindWord] = useState("");
    const [replaceWord, setReplaceWord] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showFindModal, setShowFindModal] = useState(false);
    const [message, setMessage] = useState("");
    const [fndMessage, setFndMessage] = useState("");

    const handleCopy = () => {
        let copiedText = document.getElementById('myBox');
        copiedText.select();
        copiedText.setSelectionRange(0,99999);
        navigator.clipboard.writeText(copiedText.value);
        props.showAlert("Copied to clipboard", 'success');
    }

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("converted to upper case", 'success');
    }

    const handleLowClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("converted to Lower case", 'success');
    }

    const handleClear = () => {
        let newText = "";
        setText(newText);
        props.showAlert("Cleared Text", 'success');
    }

    const handleSpeak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
      }
    
    const handleExtraSpaces = () => {
        let newText = text.replace(/\s+/g, ' ').trim();
        setText(newText);
        props.showAlert("Removed extra spaces", 'success');
    }

    const handleReverse = () => {
        let newText = text.split('').reverse().join('');
        setText(newText);
        props.showAlert("Text reversed", 'success');
    }

    const handleFindReplace = () => {
        if (text.includes(findWord)) {
            let newText = text.replaceAll(findWord, replaceWord);
            setText(newText);
            // setShowModal(false); // Close the modal after replacing
            setMessage(`"${findWord}" found and replaced with "${replaceWord}".`)
        }
        else {
            setMessage(`"${findWord}" not found in the text.`);
        }
    }

    const handleFind = () => {
        if (text.includes(findWord)) {
            setMessage(`"${findWord}" found at position ${text.indexOf(findWord) + 1}`);
            }
            else {
                setMessage(`"${findWord}" not found in the text.`);
                }
    }

    const handleOnChange = (event) => {
        console.log("on change");
        setText(event.target.value);
        setMessage('');
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setFindWord("");
        setReplaceWord("");
        setMessage('');
    }

    const handleCloseFindModal = () => {
        setShowFindModal(false);
        setFindWord("");
        setMessage('');
    }

    return (
        <>
            <div className='container' style={{color: props.mode ==='dark' ? 'white' : 'black'}}>
            <h1 style={{marginBottom: "20px"}}>{props.heading}</h1>
            <div className="mb-3">
            {/* <label htmlFor="myBox" className="form-label">Example textarea</label> */}
            <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode ==='dark' ? '#3b3b3b' : 'white', color: props.mode ==='dark' ? 'white' : 'black'  }} id="myBox" rows="8"></textarea>
            </div>

            <div className='btnFunctions' ></div>
            <button className="btn btn-primary mx-2 my-2" onClick={handleCopy}>Copy Text</button>
            <br />
            <button className="btn btn-primary mx-2 my-2" onClick={handleSpeak}>Speak</button>
            <button className="btn btn-primary mx-2 my-2" onClick={handleUpClick}>Convert to Uppercase</button>
            <button className="btn btn-primary mx-2 my-2" onClick={handleLowClick}>Convert to Lowercase</button>
            <button className="btn btn-primary mx-2 my-2" onClick={handleClear}>Clear Text</button>
            <button className="btn btn-primary mx-2 my-2" onClick={handleReverse}>Reverse Text</button>
            <button className="btn btn-primary mx-2 my-2" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
            <button className="btn btn-primary mx-2 my-2" onClick={() => setShowFindModal(true)}>Find</button>
            <button className="btn btn-primary mx-2 my-2" onClick={() => setShowModal(true)}>Find & Replace</button>
            
            </div> 

            
            <div className='container my-3' style={{color: props.mode ==='dark' ? 'white' : 'black'}}>
                <h1>Your Text Summary</h1>
                <h4>Preview</h4>
                <p>{text.length > 0 ? text : "Enter text to preview it here"}</p>
                <hr />
                <p> <b> Word Count - </b>  
                    {text.length===0 ? 0 : text.replace(/\s+/g, ' ').trim().split(" ").length}</p>
                    <p> <b>Character count -  </b> {text.length} </p>
                <p>  <b> Character count without spaces - </b> {text.replace(/\s+/g,'').length}</p>
                <p> <b> Time - </b>{0.008 * text.length===0 ? 0 : text.replace(/\s+/g, ' ').trim().split(" ").length} Minutes to read </p>
                <p> <b> Vowel count - </b> {text.match(/[aeiouAEIOU]/g)?.length || 0} </p>
                <p> <b> Consonant count - </b> {text.match(/[qQWwrRTtyYpPSsdDFfgGHhjJkKlLmMnNbBvVcCxXzZ]/g)?.length || 0} </p>
                <p><b>Sentence Count - </b> {text.split(/[.!?]/).filter(sentence => sentence.trim().length > 0).length || 0}</p>
                <p> <b> Longest Word - </b> {text.split(/\s+/).reduce((long, word) => word.length > long.length ? word : long, "")}</p>
            </div>
            
            {/* Modal for Find and Replace*/}
            { showModal && (
                <div className="modal-overlay">
                <div className="modal-content" style={{backgroundColor: props.mode ==='dark' ? '#3b3b3b' : 'white', color: props.mode ==='dark' ? 'white' : 'black' , borderColor: "2px solid white"}}>
                   
                  <h2>Find and Replace</h2>
                  <div className="form-group">
                    <label>Find:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={findWord}
                      onChange={(e) => setFindWord(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                <label>Replace:</label>
                <input
                    type="text"
                    className="form-control"
                    value={replaceWord}
                    onChange={(e) => setReplaceWord(e.target.value)}
                />
                    </div> 
                    {message && <p className="message">{message}</p>}
                    <button className="btn btn-success my-2" onClick={handleFindReplace}>
              Replace
            </button>
            <button className="btn btn-danger my-2" onClick={handleCloseModal}>
              Close
            </button>
            </div> 
            </div>    
            )}

            {/* Modal for Find */}
            {showFindModal && (
                <div className="modal-overlay">
                <div className="modal-content">
                <h2>Find</h2>
            <div className="form-group">
              <label>Find:</label>
              <input
                type="text"
                className="form-control"
                value={findWord}
                onChange={(e) => setFindWord(e.target.value)}
              />
            </div>

            {message && <p className="message">{message}</p>}

            <button className="btn btn-success my-2" onClick={handleFind}>
              Find
            </button>
            <button className="btn btn-danger my-2" onClick={handleCloseFindModal}>
              Close
            </button>
          </div>
        </div>
            )}

            <style jsx>{`
            .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            }
            .modal-content {
            background: white;
            padding: 20px;
            border-radius: 5px;
            width: 300px;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
            }
            .form-group {
            margin-bottom: 1rem;
            }
        .message {
          color: ${message.includes('not found') ? 'red' : 'green'};
          font-weight: bold;
        }
      `}</style>

        </>
    
  )
}
