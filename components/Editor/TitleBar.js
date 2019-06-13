import NpmIcon from "../Icons/NpmIcon";
import GithubIcon from "../Icons/GithubIcon";

export default () => (
  <div className="title-bar">
    <a
      href="https://www.npmjs.com/package/@thesherwood/reconjs"
      className="icon-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <NpmIcon size="36" />
    </a>
    <h1>Recon JS</h1>
    <a
      href="https://github.com/theSherwood/ReconJS"
      className="icon-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <GithubIcon size="36" />
    </a>
    <style jsx>{`
      .title-bar {
        padding: 1px 1px;
        background-color: rgb(27, 27, 27);
        background-image: radial-gradient(
          circle,
          rgba(77, 77, 77, 1) 4%,
          rgba(10, 10, 10, 1) 100%
        );
        font-size: 1.6em;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      h1 {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        font-family: SEGA, arial;
        color: white;
        margin: 0.1em;
      }

      .icon-link {
        margin: 0px 1em;
        display: grid;
        place-items: center;
      }

      @media only screen and (max-width: 600px) {
        h1 {
          font-size: 1.8em;
        }
      }

      @media only screen and (max-width: 500px) {
        h1 {
          font-size: 1.4em;
        }
      }

      @media only screen and (max-width: 400px) {
        h1 {
          font-size: 1.2em;
        }

        .icon-link {
          margin: 0em 0.2em;
        }
      }
    `}</style>
  </div>
);
