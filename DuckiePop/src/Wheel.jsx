import React, { useState, useRef } from "react";
import "./Wheel.css"; // Add this file for styles

const Wheel = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);

  const toggleSpin = () => {
    setIsSpinning((prev) => !prev);
  };

  React.useEffect(() => {
    let animationFrame;

    if (isSpinning) {
      const rotate = () => {
        setRotation((prevRotation) => prevRotation + 5); // Increment rotation by 5 degrees
        animationFrame = requestAnimationFrame(rotate);
      };
      rotate();
    } else {
      cancelAnimationFrame(animationFrame);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isSpinning]);

  return (
    <div className="wheel-container">
      <div
        className="wheel"
        ref={wheelRef}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {Array.from({ length: 16 }).map((_, index) => (
          <div
            key={index}
            className="wheel-part"
            style={{ transform: `rotate(${index * 22.5}deg)` }}
          >
            <span>{index + 1}</span>
          </div>
        ))}
      </div>
      <button className="center-button" onClick={toggleSpin}>
        {isSpinning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default Wheel;
