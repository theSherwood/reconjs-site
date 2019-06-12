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

  if (!render || !CodeMirror) {
    return null;
  }

  const handleButtonClick = e => {
    console.log(e.target);
  };

  const { Controlled } = CodeMirror;
  return (
    <div className="editor-container">
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
      {/*Vector Illustration by <a href="https://vecteezy.com">www.Vecteezy.com</a>*/}
      <AnimatedButton onClick={handleSubmit} size="64" />

      <EditorError errors={errors} />
      <style global jsx>
        {`
          .CodeMirror {
            font-size: 1.5em;
          }
        `}
      </style>
      <style jsx>
        {`
          .editor-container {
            max-width: 700px;
            width: 95%;
            margin: auto;
          }

          .react-codemirror2 {
            width: 100%;
            margin: 20px auto;
          }

          /* https://codepen.io/mikehaart/pen/qwbdLJ */
          #screen {
            position: relative;
            background-color: #263238;
            min-height: 20rem;
            width: 90%;
            border-radius: 50% / 10%;
            margin: 0 auto;
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
          }
        `}
      </style>
    </div>
  );
};

export default Editor;
