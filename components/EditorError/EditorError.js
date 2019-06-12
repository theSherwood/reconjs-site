const EditorError = props => {
  const { errors } = props;
  if (!errors || !Object.keys(errors).length) return null;
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
    <div>{errs.length ? errs.map(err => <p key={err}>{err}</p>) : null}</div>
  );
};

export default EditorError;
