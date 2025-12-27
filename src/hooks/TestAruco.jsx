import { useEffect } from "react";

export default function TestAruco() {
  useEffect(() => {
    const testMarker = async () => {
      // Ждём загрузки OpenCV
      cv['onRuntimeInitialized'] = () => {
        console.log("OpenCV и ArUco загружены для теста на изображении");

        // Загружаем изображение с маркером
        const imgElement = document.createElement('img');
        imgElement.src = "/test_marker.png";
        imgElement.onload = () => {
          const mat = cv.imread(imgElement);

          const dictionary = new cv.aruco_Dictionary(cv.DICT_4X4_50);
          const detectorParams = new cv.aruco_DetectorParameters();
          const detector = new cv.aruco_ArucoDetector(dictionary, detectorParams);

          const corners = new cv.MatVector();
          const ids = new cv.Mat();

          detector.detectMarkers(mat, corners, ids);
          console.log("IDs на фото:", Array.from(ids.data32S));

          mat.delete();
          corners.delete();
          ids.delete();
        };
      };
    };

    testMarker();
  }, []);

  return <div>Проверка ArUco на изображении… Смотри консоль</div>;
}