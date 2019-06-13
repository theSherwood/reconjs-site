import React, { Fragment } from "react";
import EditorError from "../EditorError/EditorError";
import Victors from "../Victors/Victors";

const Modal = ({
  errors,
  showVictors,
  onKeyDown,
  naming,
  newVictor,
  victors
}) => {
  return (
    <Fragment>
      <div className="modal-container" onKeyDown={onKeyDown}>
        {errors ? <EditorError errors={errors} /> : null}
        {showVictors ? (
          <Victors victors={victors} newVictor={newVictor} naming={naming} />
        ) : null}
      </div>
      <style jsx>{`
        .modal-container {
          position: absolute;
          left: 0;
          right: 0;
          top: 9%;
          bottom: 9%;
          background: #263238;
          padding: 0.5em 0.5em;
          margin: 0em 0.5em;
          overflow-y: auto;
          font-family: monospace;
          font-size: 1.5em;
          z-index: 4;
          scrollbar-color: #546e7a transparent;
          scrollbar-width: thin;
        }

        .modal-container::-webkit-scrollbar {
          width: 0.5em;
        }

        .modal-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .modal-container::-webkit-scrollbar-thumb {
          background-color: #546e7a;
        }

        @media only screen and (max-width: 600px) {
          .modal-container {
            margin: 0em 0.25em;
          }
        }

        @media only screen and (max-width: 500px) {
          .modal-container {
            margin: 0em 0.1em;
          }
        }
      `}</style>
    </Fragment>
  );
};

export default Modal;
