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

  return (
    <Fragment>
      <button
        className="invisible-btn"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <ArcadeButton size={size} />
        <div className={pressed ? "svg-overlay pressed" : "svg-overlay"}>
          <ArcadeButtonDepressed size={size} />
        </div>
      </button>
      <style jsx>{`
        button {
          background: none;
          outline: none;
          border: none;
          padding: 0;
          margin: 0;
          position: relative;
          height: min-content;
        }

        .svg-overlay {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          transition: opacity 100ms ease-in;
        }

        .pressed {
          opacity: 0.8;
        }
      `}</style>
    </Fragment>
  );
};

export default AnimatedButton;
