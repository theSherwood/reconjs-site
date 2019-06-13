import React, { Fragment, useEffect, useState, useRef } from "react";
import Recon from "@thesherwood/reconjs";
import AnimatedButton from "../Buttons/AnimatedButton";
import Modal from "../Modal/Modal";
import NpmIcon from "../Icons/NpmIcon";
import GithubIcon from "../Icons/GithubIcon";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

let CodeMirror;
const r = new Recon();

const Editor = () => {
  const [render, setRender] = useState(false);
  const [editorValue, setEditorValue] = useState(
    "/*\nAttempt to get past ReconJS's static security checks:\n\nChange the value of window.target from within the arcade console and add your name to the list of victors!\n*/"
  );
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    CodeMirror = require("react-codemirror2");
    require("codemirror/mode/javascript/javascript");
    setRender(true);
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      setShowModal(2);
    }
  }, [errors]);

  const handleSubmit = () => {
    setErrors({});
    if (editorValue) {
      try {
        const results = r.check(editorValue);
        if (results) {
          setErrors(results);
        } else {
          const targetString = Math.random.toString();
          window.target = targetString;
          const evalGlobal = eval;
          evalGlobal(editorValue);
          if (window.target !== targetString) {
            sumbitToServer(editorValue);
          } else {
            setErrors({
              name: "Failure",
              message:
                "your code passed the security check but window.target was unaffected"
            });
          }
          delete window.target;
        }
      } catch (err) {
        setErrors(err);
      }
    } else {
      setErrors({ name: "Error", message: "you must enter some code" });
    }
  };

  const sumbitToServer = code => {
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
      .then(data => console.log(data))
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

  const Controlled = CodeMirror ? CodeMirror.Controlled : undefined;
  return (
    <div className="editor-container" onKeyDown={handleKeyDown}>
      <div className="title-board">
        <a
          href="https://www.npmjs.com/package/@thesherwood/reconjs"
          className="icon-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <NpmIcon size="36" />
        </a>
        <h1>Recon JS</h1>
        <a
          href="https://github.com/theSherwood/ReconJS"
          className="icon-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon size="36" />
        </a>
      </div>
      <div id="screen-wrapper">
        <div id="screen">
          {render && CodeMirror ? (
            <Controlled
              value={editorValue}
              options={{
                mode: "javascript",
                theme: "material",
                lineNumbers: true,
                lineWrapping: true,
                tabSize: 2
              }}
              onBeforeChange={(editor, data, value) => {
                setEditorValue(value);
              }}
              onChange={(editor, data, value) => {}}
            />
          ) : null}
          {showModal % 3 === 0 ? null : showModal % 3 === 1 ? (
            <Modal showVictors onKeyDown={handleKeyDown} />
          ) : (
            <Modal errors={errors} onKeyDown={handleKeyDown} />
          )}
        </div>
      </div>
      <div className="console-wrapper">
        <div className="console">
          {/*Vector Illustration by <a href="https://vecteezy.com">www.Vecteezy.com</a>*/}
          <AnimatedButton
            onClick={handleSubmit}
            size="64"
            title="Submit (Ctrl-Enter)"
          />
          <AnimatedButton
            onClick={toggleScreens}
            size="64"
            selected={!!(showModal % 3)}
            title="Toggle Screens (Ctrl-Space)"
          />
        </div>
      </div>

      <style global jsx>
        {`
          .CodeMirror {
            font-size: 1.5em;
            height: 100%;
            z-index: 2;
          }

          .react-codemirror2 {
            height: 100%;
            overflow-y: auto;
            scrollbar-color: #546e7a transparent;
            scrollbar-width: thin;
          }

          .react-codemirror2::-webkit-scrollbar {
            width: 0.5em;
          }

          .react-codemirror2::-webkit-scrollbar-track {
            background: transparent;
          }

          .react-codemirror2::-webkit-scrollbar-thumb {
            background-color: #546e7a;
          }
        `}
      </style>
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

          .react-codemirror2 {
            width: 100%;
            margin: 20px auto;
          }

          .title-board {
            padding: 1px 1px;
            background-color: rgb(27, 27, 27);
            background-image: radial-gradient(
              circle,
              rgba(77, 77, 77, 1) 4%,
              rgba(10, 10, 10, 1) 100%
            );
            font-size: 1.6em;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .title-board h1 {
            margin: 0.1em;
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

          .console-wrapper {
            perspective: 1000px;
          }

          .console {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-around;
            padding: 15px 0px;
            border: solid 1px black;
            transform-style: preserve-3d;
            transform: rotateX(15deg);
            perspective: 1000px;
            width: 95%;
            margin: 0 auto;
            background-color: rgb(27, 27, 27);
            background-image: radial-gradient(
              circle,
              rgba(37, 37, 37, 1) 4%,
              rgba(0, 0, 0, 1) 100%
            );
          }

          h1 {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            font-family: SEGA, arial;
            transform: rotateX(10deg) translateZ(5px);
            color: white;
          }

          .icon-link {
            margin: 0px 1em;
            display: grid;
            place-items: center;
          }

          @media only screen and (max-width: 600px) {
            #screen {
              width: 80%;
              padding: 1.5rem 1rem;
              height: 400px;
            }

            h1 {
              font-size: 1.8em;
            }

            .console {
              padding: 10px 0px;
            }
          }

          @media only screen and (max-width: 500px) {
            #screen {
              width: 88%;
              padding: 1rem 0rem;
              height: 300px;
            }

            h1 {
              font-size: 1.4em;
            }

            .console {
              padding: 5px 0px;
            }
          }

          @media only screen and (max-width: 400px) {
            h1 {
              font-size: 1.2em;
            }

            .icon-link {
              margin: 0em 0.2em;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Editor;
