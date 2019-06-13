export const initialEditor = {
  editorValue: "// TODO: change the value of window.target\n",
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
