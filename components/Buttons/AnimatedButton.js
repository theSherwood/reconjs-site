import ArcadeButton from "./ArcadeButton";
import ArcadeButtonDepressed from "./ArcadeButtonDepressed";
import React, { useState, Fragment, useEffect } from "react";

const AnimatedButton = ({ size, onClick, selected, title }) => {
  const [pressed, setPressed] = useState(false);
  const [flashing, setFlashing] = useState(false);

  useEffect(() => {
    if (pressed) {
      onClick();
    }
  }, [pressed]);

  useEffect(() => {
    if (selected) {
      let flash = flashing;
      const intervalId = setInterval(() => {
        flash = !flash;
        setFlashing(flash);
      }, 400);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [selected]);

  const handleMouseDown = () => {
    setPressed(true);
  };

  const handleMouseUp = () => {
    setPressed(false);
  };

  return (
    <Fragment>
      <div className={flashing ? "highlight-btn flash" : "highlight-btn"}>
        <button
          className="invisible-btn"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          title={title}
        >
          <ArcadeButton size={size} />
          <div className={pressed ? "svg-overlay pressed" : "svg-overlay"}>
            <ArcadeButtonDepressed size={size} />
          </div>
        </button>
      </div>
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

        .highlight-btn {
          background: white;
          padding: 5px 5px 0px 5px;
          border-radius: 100%;
          height: min-content;
        }

        .highlight-btn.flash {
          background: transparent;
        }
      `}</style>
    </Fragment>
  );
};

export default AnimatedButton;
