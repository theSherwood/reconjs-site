const colors = "#82b1ff #80cbae #c192ea #c3e88d #e9eded #f07669".split(" ");

function randColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function rainbowize(string) {
  return string
    .split("")
    .map(char => <span style={{ color: randColor(colors) }}>{char}</span>);
}

const Victors = ({ victors, newVictor }) => {
  return (
    <div>
      {victors ? (
        victors.map(victor => {
          const rainbowName = rainbowize(victor.name);
          const rainbowDate = rainbowize(victor.date);
          return (
            <div className="victor">
              <span>{rainbowName}</span>
              <span>{rainbowDate}</span>
            </div>
          );
        })
      ) : (
        <p>No victors currently</p>
      )}
      <style jsx>{`
        .victor {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          font-size: 1.5em;
          margin: 10px 0px;
        }
      `}</style>
    </div>
  );
};

export default Victors;
