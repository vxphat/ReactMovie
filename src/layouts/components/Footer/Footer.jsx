import styles from './Footer.module.scss'

const Footer = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.copyright}>Thank you for visiting my page | 2022 ©</div>
            <div className={styles.version}>v1.0.0</div>
        </div>
    )
}

export default Footer