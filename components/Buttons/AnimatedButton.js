import ArcadeButton from "./ArcadeButton";
import ArcadeButtonDepressed from "./ArcadeButtonDepressed";
import React, { useState, Fragment, useEffect } from "react";

const AnimatedButton = ({ size, onClick }) => {
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (pressed) {
      onClick();
    }
  }, [pressed]);

  const handleMouseDown = () => {
    setPressed(true);
  };

  const handleMouseUp = () => {
    setPressed(false);
  };

  const contents = pressed ? <ArcadeButtonDepressed /> : <ArcadeButton />;

  return (
    <Fragment>
      <button
        className="invisible-btn"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {contents}
      </button>
      <style global jsx>{`
        .invisible-btn {
          background: none;
          outline: none;
          border: none;
          padding: none;
          margin: none;
        }
      `}</style>
    </Fragment>
  );
};

export default AnimatedButton;
