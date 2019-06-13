import { Fragment, useState, useEffect } from "react";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

let CodeMirror;

export default ({ editorValue, setEditorValue }) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    CodeMirror = require("react-codemirror2");
    require("codemirror/mode/javascript/javascript");
    setRender(true);
  }, []);

  const Controlled = CodeMirror ? CodeMirror.Controlled : undefined;
  return render && CodeMirror ? (
    <Fragment>
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
      <style global jsx>
        {`
          .CodeMirror {
            font-size: 1.5em;
            height: 100%;
            z-index: 2;
            padding: 4px;
          }
        `}
      </style>
      <style jsx>
        {`
          .react-codemirror2 {
            height: 100%;
            overflow: hidden;
            scrollbar-color: #546e7a transparent;
            scrollbar-width: thin;
            width: 100%;
            margin: 20px auto;
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
    </Fragment>
  ) : null;
};
