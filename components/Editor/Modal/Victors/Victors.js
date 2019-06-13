import { useState } from "react";

const colors = "#82b1ff #80cbae #c192ea #c3e88d #e9eded #f07669".split(" ");

function randColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function rainbowize(string) {
  return string.split("").map((char, i) => (
    <span key={i} style={{ color: randColor(colors) }}>
      {char}
    </span>
  ));
}

const Victors = ({ victors, newVictor, naming }) => {
  const handleInput = e => {
    const value = e.target.value;
    naming.setName(value.slice(0, 20));
  };

  return (
    <div className="victor-container">
      {newVictor ? (
        <div>
          <h3 className="text-center">{rainbowize(" You  beat  Recon JS ")}</h3>
          <p className="text-center">
            {
              "Thank you for helping us make ReconJS better! Enter your name to be added to the list of victors:"
            }
          </p>
          <input
            className="input-name"
            size="10"
            value={naming.name}
            onChange={handleInput}
          />
        </div>
      ) : null}
      {victors ? (
        <div>
          <h2>Previous Victors:</h2>
          {victors.map((victor, index) => (
            <div className="victor" key={index}>
              <h3>{rainbowize(victor.name)}</h3>
              <h3>{rainbowize(new Date(victor.date).toLocaleDateString())}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No victors currently</p>
      )}
      <style jsx>{`
        .victor-container {
          font-family: monospace;
        }

        .victor {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          // font-size: 1.2em;
          margin: 0px 0px;
        }

        .victor h3 {
          margin: 10px 0px;
        }

        .input-name {
          background: transparent;
          display: block;
          outline: none;
          border: none;
          border-bottom: solid 2px #e9eded;
          margin: auto;
          margin-bottom: 20px;
          font-family: monospace;
          font-size: 1.5em;
          color: #e9eded;
          text-align: center;
        }

        .text-center {
          text-align: center;
        }

        p.text-center {
          color: #e9eded;
        }

        h3.text-center {
          font-family: SEGA, monospace;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          white-space: pre-wrap;
          line-height: 1.2em;
        }

        h2 {
          color: #e9eded;
          margin-bottom: 10px;
          margin-top: 1em;
        }

        @media only screen and (max-width: 600px) {
          .victor-container {
            font-size: 0.9em;
          }
        }

        @media only screen and (max-width: 500px) {
          .victor-container {
            font-size: 0.8em;
          }
        }
      `}</style>
    </div>
  );
};

export default Victors;
