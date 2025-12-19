import styles from "./ImageWrapper.module.css";

const ImageWrapper = ({ src, alt, ratio = "16/9" }) => {
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