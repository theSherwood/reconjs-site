import React, { useEffect, useState } from "react";
import Recon from "@thesherwood/reconjs";
import Modal from "./Modal/Modal";
import TitleBar from "./TitleBar";
import Console from "./Console";
import CodeMirrorComponent from "./CodeMirrorComponent";

const r = new Recon();

const Editor = () => {
  const [editorValue, setEditorValue] = useState(
    "// TODO: change the value of window.target\n"
  );
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(2);
  const [breachId, setBreachId] = useState("");
  const [name, setName] = useState("");
  const [victors, setVictors] = useState([]);

  const setEditorAndClear = code => {
    setErrors({});
    setEditorValue(code);
  };

  useEffect(() => {
    if (Object.keys(errors).length) {
      setShowModal(2);
    }
  }, [errors]);

  useEffect(() => {
    fetch("/api/victor.js")
      .then(res => res.json())
      .then(data => {
        setVictors(data);
      })
      .catch(err => console.log(err));
  }, [breachId]);

  const handleSubmit = () => {
    if (breachId && name) {
      submitName();
    } else {
      submitCode();
    }
  };

  const submitName = () => {
    fetch("/api/victor.js", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        breachId
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setBreachId("");
      })
      .catch(err => console.log(err));
  };

  const submitCode = () => {
    setErrors({});
    if (editorValue.length > 2000) {
      setErrors({
        name: "Error",
        message: "the length of your code must be fewer than 2000 characters"
      });
      return;
    }
    if (editorValue) {
      try {
        const results = r.check(editorValue);
        if (results) {
          setErrors(results);
        } else {
          // const targetString = Math.random.toString();
          // window.target = targetString;
          // const evalGlobal = eval;
          // evalGlobal(editorValue);
          // if (window.target !== targetString) {
          sumbitCodeToServer(editorValue);
          // } else {
          //   setErrors({
          //     name: "Failure",
          //     message:
          //       "your code passed the security check but window.target was unaffected"
          //   });
          // }
          // delete window.target;
        }
      } catch (err) {
        setErrors(err);
      }
    } else {
      setErrors({
        name: "Error",
        message: "you must enter some code"
      });
    }
  };

  const sumbitCodeToServer = code => {
    fetch("/api/breach.js", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.hasOwnProperty("name") && data.name === "RateLimitError") {
          setErrors(data);
        } else {
          setBreachId(data);
        }
      })
      .catch(err => console.log(err));
  };

  const toggleScreens = () => {
    setShowModal(showModal + 1);
  };

  const handleKeyDown = e => {
    if (e.ctrlKey) {
      if (e.key === "Enter") {
        handleSubmit();
      } else if (e.key === " ") {
        toggleScreens();
      }
    }
  };

  return (
    <div className="editor-container" onKeyDown={handleKeyDown}>
      <TitleBar />
      <div id="screen-wrapper">
        <div id="screen">
          <CodeMirrorComponent
            editorValue={editorValue}
            setEditorAndClear={setEditorAndClear}
          />
          {showModal % 3 === 0 ? null : showModal % 3 === 1 ? (
            <Modal
              showVictors
              newVictor={!!breachId}
              onKeyDown={handleKeyDown}
              naming={{
                name,
                setName
              }}
              victors={victors}
            />
          ) : (
            <Modal errors={errors} onKeyDown={handleKeyDown} />
          )}
        </div>
      </div>
      <Console
        handleSubmit={handleSubmit}
        toggleScreens={toggleScreens}
        showModal={showModal}
      />
      <style jsx>
        {`
          .editor-container {
            max-width: 800px;
            width: 95%;
            min-height: 100vh;
            margin: auto;
            background: rgb(0, 0, 0);
            background: radial-gradient(
              circle,
              rgba(0, 0, 0, 1) 60%,
              rgba(27, 27, 27, 1) 100%
            );
            border-left: solid 4px white;
            border-right: solid 4px white;
          }

          #screen-wrapper {
            padding: 10px 0px;
            z-index: -1;
          }

          /* https://codepen.io/mikehaart/pen/qwbdLJ */
          #screen {
            position: relative;
            background-color: #263238;
            min-height: 250px;
            border-radius: 50% / 10%;
            margin: 0 auto;
            width: 85%;
            flex: 1;
            padding: 2.5rem 1rem;
            height: 500px;
            display: flex;
            flex-direction: column;
          }

          #screen:before {
            content: "";
            position: absolute;
            z-index: -999;
            top: 8%;
            bottom: 8%;
            right: -4%;
            left: -4%;
            background-color: #263238;
            border-radius: 5% / 50%;
            z-index: 1;
          }

          @media only screen and (max-width: 600px) {
            #screen {
              width: 80%;
              padding: 1.5rem 1rem;
              height: 400px;
            }
          }

          @media only screen and (max-width: 500px) {
            #screen {
              width: 88%;
              padding: 1rem 0rem;
              height: 300px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Editor;
