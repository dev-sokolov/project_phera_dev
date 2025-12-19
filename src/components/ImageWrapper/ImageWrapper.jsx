import styles from "./ImageWrapper.module.css";

// const ImageWrapper = ({ src, alt, ratio = "16/9" }) => {
const ImageWrapper = ({ src, alt, ratio = "3/2" }) => {
    return (
        <div
            className={styles.img}
            style={{ aspectRatio: ratio }}
        >
            <img src={src} alt={alt} />
        </div>
    );
};

export default ImageWrapper;

// Использование
// <ImageWrapper src={step5} alt="step 5" ratio="4/3" />