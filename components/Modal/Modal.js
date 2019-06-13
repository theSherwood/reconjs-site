import React, { Fragment } from "react";
import EditorError from "../EditorError/EditorError";
import Victors from "../Victors/Victors";

const mockVictors = [
  {
    name: "john",
    date: "412349"
  },
  {
    name: "Jane",
    date: "19470"
  }
];

const Modal = ({ errors, showVictors, onKeyDown }) => {
  return (
    <Fragment>
      <div className="modal-container" onKeyDown={onKeyDown}>
        <p>Here is some text</p>
        {errors ? <EditorError errors={errors} /> : null}
        {showVictors ? <Victors victors={mockVictors} /> : null}
      </div>
      <style jsx>{`
        .modal-container {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          border-radius: 50% / 10%;
          background: #263238;
          padding: 2.5em 1.5em;
          overflow-y: auto;
          font-family: monospace;
          font-size: 1.5em;
          z-index: 4;
        }
      `}</style>
    </Fragment>
  );
};

export default Modal;
