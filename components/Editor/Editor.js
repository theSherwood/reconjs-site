import React, { Fragment, useEffect, useState } from "react";
import Recon from "@thesherwood/reconjs";
import EditorError from "../EditorError/EditorError";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

let CodeMirror;
const r = new Recon();

const Editor = () => {
  const [render, setRender] = useState(false);
  const [editorValue, setEditorValue] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    CodeMirror = require("react-codemirror2");
    require("codemirror/mode/javascript/javascript");
    setRender(true);
  }, []);

  const handleSubmit = () => {
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
  const { Controlled } = CodeMirror;
  return (
    <Fragment>
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
      <button onClick={handleSubmit}>Submit</button>
      <EditorError errors={errors} />
      <style global jsx>
        {`
          .CodeMirror {
            font-size: 1.5em;
          }
        `}
      </style>
    </Fragment>
  );
};

export default Editor;
