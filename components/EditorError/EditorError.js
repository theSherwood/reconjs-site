const EditorError = props => {
  const { errors } = props;
  if (!errors) return null;
  let errs;
  if (Array.isArray(errors)) {
    errs = errors.map(error => {
      let errStr = "illicit: " + error.illicit;
      return errStr;
    });
  } else {
    errs = errors;
  }
  return (
    <div>
      <p>{errs}</p>
    </div>
  );
};

export default EditorError;
