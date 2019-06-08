import React, { Fragment, useEffect, useState } from "react";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

let CodeMirror;

const Editor = () => {
  const [render, setRender] = useState(false);
  const [editorValue, setEditorValue] = useState("");

  useEffect(() => {
    CodeMirror = require("react-codemirror2");
    require("codemirror/mode/javascript/javascript");
    setRender(true);
  }, []);

  const handleSubmit = () => {
    console.log(editorValue);
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
    </Fragment>
  );
};

export default Editor;
