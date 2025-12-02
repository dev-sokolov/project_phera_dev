import { useState, useRef } from "react";
import styles from "./AdjustableFrame.module.css";

const AdjustableFrame = () => {
  const [pos, setPos] = useState({ x: 50, y: 50, w: 200, h: 400 }); 
  const frameRef = useRef(null);
  const dragStart = useRef(null);

  const onMouseDown = (e) => {
    dragStart.current = { x: e.clientX, y: e.clientY, ...pos };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPos({
      ...pos,
      x: dragStart.current.x + dx - dragStart.current.x,
      y: dragStart.current.y + dy - dragStart.current.y,
    });
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      ref={frameRef}
      className={styles.adjustableFrame}
      onMouseDown={onMouseDown}
    />
  );
};

export default AdjustableFrame;