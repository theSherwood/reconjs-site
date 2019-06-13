import React, { Fragment } from "react";

const EditorError = props => {
  const { errors } = props;
  if (!errors || !Object.keys(errors).length)
    return (
      <Fragment>
        <p>
          See if you can beat ReconJS by changing the value of window.target
        </p>
        <p>
          Submit your code using the button at the bottom-left or using
          Ctrl-Enter
        </p>
        <style jsx>{`
          p {
            color: #f07669;
            line-height: 1.2em;
          }
        `}</style>
      </Fragment>
    );

  let errs;
  if (Array.isArray(errors)) {
    errs = errors.map(error => {
      let errStr =
        "ReconError: '" +
        error.illicit +
        "' is an illicit word (line: " +
        error.line +
        ", column: " +
        error.startColumn +
        ")";
      return errStr;
    });
  } else if (errors.hasOwnProperty("message")) {
    errs = [errors.name + ": " + errors.message];
  }

  return (
    <div>
      {errs.length ? errs.map(err => <p key={err}>{err}</p>) : null}
      <style jsx>{`
        div {
          color: #f07669;
        }
      `}</style>
    </div>
  );
};

export default EditorError;
