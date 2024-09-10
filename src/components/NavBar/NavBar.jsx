
import { NavLink } from "react-router-dom";
import { CartWidget } from "../CartWidget/CartWidget";
import styles from './NavBar.module.css';
const logo = "./cafelogo.png"; 

export function NavBar() {
    return (
        <nav className={styles.navContainer}>
            <NavLink to="/" className={styles.navbarLogoLink}>
                <img src={logo} alt="tienda" className={styles.navbarLogo} />
            </NavLink>
            <div className={styles.navLinks}>
                <NavLink to="/" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Inicio</NavLink>
                <NavLink to="/category/Internacional" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Internacional</NavLink>
                <NavLink to="/category/Nacional" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Nacional</NavLink>
                <NavLink to="/category/Vajilla" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Vajilla</NavLink>
            </div>
            <CartWidget />
        </nav>
    );
}

