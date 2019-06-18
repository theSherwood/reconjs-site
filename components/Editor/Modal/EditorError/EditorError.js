const EditorError = props => {
  const { errors } = props;
  if (!errors || !Object.keys(errors).length)
    return (
      <div>
        <p>
          Help us improve ReconJS! See if you can beat the security checks and
          change the value of window.target. We save successful breaches in
          order to make ReconJS better.
        </p>
        <p>
          Submit your code using the button at the bottom-left (Ctrl-Enter). The
          bottom-right button (Ctrl-Space) switches between the various views.
        </p>
        <p>
          Change the value of window.target from within the arcade console and
          add your name to the list of victors!
        </p>
        <style jsx>{`
          p {
            color: #f07669;
            line-height: 1.2em;
          }

          @media only screen and (max-width: 500px) {
            div {
              font-size: 0.8em;
            }
          }
        `}</style>
      </div>
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

        @media only screen and (max-width: 500px) {
          div {
            font-size: 0.8em;
          }
        }
      `}</style>
    </div>
  );
};

export default EditorError;
