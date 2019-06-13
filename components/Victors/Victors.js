const mockVictors = [
  {
    name: "john",
    date: "412349"
  },
  {
    name: "Jane",
    date: "19470"
  }
];

const Victors = (victors, newVictor) => {
  return (
    <div>
      {mockVictors.map(victor => (
        <div className="victor">
          <span>{victor.name}</span>
          <span>{victor.date}</span>
        </div>
      ))}
      <style jsx>{`
        .victor {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default Victors;
