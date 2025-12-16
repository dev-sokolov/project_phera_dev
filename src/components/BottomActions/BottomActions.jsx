import Button from '../Button/Button';
import ButtonReverse from '../ButtonReverse/ButtonReverse';
import styles from './BottomActions.module.css';

const BottomActions = ({ primary, secondary }) => {
    if (!primary) return null;

    return (
        <div className={styles.wrapper}>
            <div className={styles.actions}>
                <Button
                    onClick={primary.onClick}
                    disabled={primary.disabled}
                    type={primary.type}
                >
                    {primary.label}
                </Button>

                {secondary && (
                    <ButtonReverse onClick={secondary.onClick}>
                        {secondary.label}
                    </ButtonReverse>
                )}
            </div>
        </div>
    );
};

export default BottomActions;