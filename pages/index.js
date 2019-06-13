import React from "react";
import { StateProvider } from "../state/GlobalState";
import Editor from "../components/Editor/Editor";

export default () => (
  <StateProvider>
    <div id="demo-page">
      <Editor />
      <style jsx>
        {`
          #demo-page {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            background: rgb(173, 32, 7);
            background: radial-gradient(
              circle,
              rgba(173, 32, 7, 1) 69%,
              rgba(27, 27, 27, 1) 100%
            );
            padding: 0;
          }
        `}
      </style>
    </div>
  </StateProvider>
);
