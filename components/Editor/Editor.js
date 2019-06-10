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
      // console.log(r.check(editorValue));
      setErrors(r.check(editorValue));
    } catch (err) {
      // console.log(err);
      setErrors(err);
    }
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
