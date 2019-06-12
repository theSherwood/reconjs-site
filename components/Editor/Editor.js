import React, { Fragment, useEffect, useState } from "react";
import Recon from "@thesherwood/reconjs";
import EditorError from "../EditorError/EditorError";
import AnimatedButton from "../Buttons/AnimatedButton";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

let CodeMirror;
const r = new Recon();

const Editor = () => {
  const [render, setRender] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    CodeMirror = require("react-codemirror2");
    require("codemirror/mode/javascript/javascript");
    setRender(true);
  }, []);

  const handleSubmit = () => {
    setErrors({});
    if (editorValue) {
      try {
        const results = r.check(editorValue);
        if (results) {
          setErrors(results);
        } else {
          sumbitToServer(editorValue);
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
      .catch(err => {
        console.log("client-side error");
        console.log(err);
      });
  };

  const triggerModal = () => {
    console.log("trigger modal...");
  };

  if (!render || !CodeMirror) {
    return null;
  }

  const { Controlled } = CodeMirror;
  return (
    <div className="editor-container">
      <div id="screen-wrapper">
        <div id="screen">
          <Controlled
            value={editorValue}
            options={{
              mode: "javascript",
              theme: "material",
              lineNumbers: true
            }}
            onBeforeChange={(editor, data, value) => {
              setEditorValue(value);
            }}
            onChange={(editor, data, value) => {}}
          />
        </div>
      </div>
      <div className="console-wrapper">
        <div className="console">
          {/*Vector Illustration by <a href="https://vecteezy.com">www.Vecteezy.com</a>*/}
          <AnimatedButton onClick={handleSubmit} size="64" />
          <h1>ReconJS</h1>
          <AnimatedButton onClick={triggerModal} size="64" />
        </div>
      </div>
      <EditorError errors={errors} />
      <style global jsx>
        {`
          .CodeMirror {
            font-size: 1.5em;
            height: 400px;
          }

          @media only screen and (max-width: 500px) {
            .CodeMirror {
              height: 300px;
            }
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
          }

          .react-codemirror2 {
            width: 100%;
            margin: 20px auto;
          }

          #screen-wrapper {
            padding: 10px 0px;
            z-index: -1;
          }

          /* https://codepen.io/mikehaart/pen/qwbdLJ */
          #screen {
            position: relative;
            background-color: #263238;
            min-height: 20rem;
            border-radius: 50% / 10%;
            margin: 0 auto;
            width: 85%;
            flex: 1;
            padding: 1.5rem 1rem;
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
            // background: rgba(17, 17, 17, 1);
            transform-style: preserve-3d;
            transform: rotateX(15deg);
            perspective: 1000px;
            width: 95%;
            margin: 0 auto;

            // background-color: rgb(27, 27, 27);
            background-image: radial-gradient(
              circle,
              rgba(37, 37, 37, 1) 4%,
              rgba(0, 0, 0, 1) 100%
            );
          }

          h1 {
            font-family: arial;
            transform: rotateX(10deg) translateZ(5px);
            color: white;
          }

          @media only screen and (max-width: 600px) {
            #screen {
              width: 80%;
            }

            h1 {
              font-size: 1.8em;
            }
          }

          @media only screen and (max-width: 500px) {
            #screen {
              width: 88%;
              padding: 1rem 0rem;
            }

            h1 {
              font-size: 1.4em;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Editor;
