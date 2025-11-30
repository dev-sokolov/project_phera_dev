// import { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import styles from "./CameraCapture.module.css"; // твои стили

// const AdjustableFrame = () => {
//   const webcamRef = useRef(null);

//   const [frame, setFrame] = useState({
//     x: 100,   // стартовая позиция слева
//     y: 100,   // стартовая позиция сверху
//     w: 200,   // ширина рамки
//     h: 400    // высота рамки
//   });

//   const [dragging, setDragging] = useState(false);
//   const [resizing, setResizing] = useState(false);
//   const [startPos, setStartPos] = useState({ x: 0, y: 0 });

//   const handleMouseDown = (e) => {
//     e.preventDefault();
//     const rect = e.target.getBoundingClientRect();
//     if (e.clientX > rect.right - 10 && e.clientY > rect.bottom - 10) {
//       setResizing(true); // угол для изменения размера
//     } else {
//       setDragging(true);
//     }
//     setStartPos({ x: e.clientX, y: e.clientY });
//   };

//   const handleMouseMove = (e) => {
//     if (!dragging && !resizing) return;
//     const dx = e.clientX - startPos.x;
//     const dy = e.clientY - startPos.y;

//     if (dragging) {
//       setFrame((f) => ({ ...f, x: f.x + dx, y: f.y + dy }));
//     } else if (resizing) {
//       setFrame((f) => ({ ...f, w: f.w + dx, h: f.h + dy }));
//     }
//     setStartPos({ x: e.clientX, y: e.clientY });
//   };

//   const handleMouseUp = () => {
//     setDragging(false);
//     setResizing(false);
//   };

//   return (
//     <div
//       className={styles.container}
//       style={{ position: "relative", width: "100%", height: "100%" }}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//     >
//       <Webcam
//         ref={webcamRef}
//         audio={false}
//         screenshotFormat="image/png"
//         videoConstraints={{ facingMode: "environment" }}
//         className={styles.webcamVideo}
//       />

//       {/* Рамка */}
//       <div
//         style={{
//           position: "absolute",
//           left: frame.x,
//           top: frame.y,
//           width: frame.w,
//           height: frame.h,
//           border: "3px solid lime",
//           boxSizing: "border-box",
//           cursor: dragging ? "move" : "default"
//         }}
//         onMouseDown={handleMouseDown}
//       >
//         {/* Уголок для изменения размера */}
//         <div
//           style={{
//             position: "absolute",
//             right: 0,
//             bottom: 0,
//             width: 15,
//             height: 15,
//             background: "lime",
//             cursor: "nwse-resize"
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default AdjustableFrame;

import { useState, useRef } from "react";
import styles from "./AdjustableFrame.module.css";

const AdjustableFrame = () => {
  const [pos, setPos] = useState({ x: 50, y: 50, w: 200, h: 400 }); // начальная позиция
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
      style={{
        position: "absolute",
        top: pos.y,
        left: pos.x,
        width: pos.w,
        height: pos.h,
        border: "2px solid green",
        cursor: "move",
        zIndex: 1000,
      }}
      onMouseDown={onMouseDown}
    />
  );
};

export default AdjustableFrame;