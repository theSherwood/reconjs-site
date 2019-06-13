import React from "react";
import App, { Container } from "next/app";

import "../static/empty.css";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <style global jsx>{`
          @font-face {
            font-family: "SEGA";
            src: url("../static/SEGA.TTF");
          }
        `}</style>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
