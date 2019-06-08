import React, { Component } from "react";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

let CodeMirror;

class Editor extends Component {
  state = {
    render: false
  };

  componentDidMount = () => {
    console.log("mounting");
    CodeMirror = require("react-codemirror2");
    require("codemirror/mode/javascript/javascript");
    this.setState({ render: true });
  };

  render() {
    const { render } = this.state;
    console.log("render");
    if (!render || !CodeMirror) {
      console.log("not rendering");
      return null;
    }
    const { Controlled } = CodeMirror;
    // return <p>Weird</p>;
    return (
      <Controlled
        value={this.state.value}
        options={{
          mode: "javascript",
          theme: "material",
          lineNumbers: true
        }}
        onBeforeChange={(editor, data, value) => {
          this.setState({ value });
        }}
        onChange={(editor, data, value) => {}}
      />
    );
  }
}

export default Editor;
