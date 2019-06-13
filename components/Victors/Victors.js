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

const Victors = ({ victors, newVictor }) => {
  return (
    <div className="victor-container">
      {newVictor ? (
        <div>
          <h3 className="text-center">{rainbowize(" You  beat  Recon JS ")}</h3>
          <p className="text-center">
            {
              "Enter your name and thank you for helping us make ReconJS better!"
            }
          </p>
          <input className="input-name" size="10" />
        </div>
      ) : null}
      {victors ? (
        victors.map((victor, i) => (
          <div className="victor" key={i}>
            <h3>{rainbowize(victor.name)}</h3>
            <h3>{rainbowize(victor.date)}</h3>
          </div>
        ))
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
          justify-content: space-between;
          font-size: 1.2em;
          margin: 0px 0px;
        }

        .victor h3 {
          margin: 15px 0px;
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
      `}</style>
    </div>
  );
};

export default Victors;
