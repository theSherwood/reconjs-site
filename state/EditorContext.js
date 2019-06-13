import React, { createContext, useContext, useReducer } from "react";

export const EditorContext = createContext();

export const EditorProvider = ({ reducer, initialState, children }) => (
  <EditorContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </EditorContext.Provider>
);

export const useEditor = () => {
  const [{ editorValue, errors }, editorDispatch] = useContext(EditorContext);

  const setErrors = errs => {
    editorDispatch({ type: "setErrors", payload: errs });
  };
  const setEditorValue = val => {
    editorDispatch({ type: "setEditorValue", payload: val });
  };

  return { editorValue, errors, setErrors, setEditorValue };
};
