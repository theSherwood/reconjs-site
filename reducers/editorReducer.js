export const initialEditor = {
  editorValue:
    "/*\nAttempt to get past ReconJS's static security checks:\n\nChange the value of window.target from within the arcade console and add your name to the list of victors!\n*/",
  errors: {}
};

export const editorReducer = (state, action) => {
  switch (action.type) {
    case "setEditorValue":
      return { errors: {}, editorValue: action.payload };
    case "setErrors":
      return { ...state, errors: action.payload };
    default:
      throw new Error("set an action type in dispatch");
  }
};
