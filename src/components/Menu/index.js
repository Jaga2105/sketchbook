import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import styles from "./index.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { MENU_ITEMS } from '@/constants';
import { menuItemCLick } from '@/store/reducers/menuSlice';
const Menu = () =>{
    const activeMenuItem = useSelector((state)=>state.menu.activeMenuItem);
    const dispatch = useDispatch();
    const handleMenu = (menuText) =>{
        dispatch(menuItemCLick(menuText))
    }

    return (
        <div className={styles.menuContainer}>
            <div className={`${styles.iconWrapper} ${activeMenuItem===MENU_ITEMS.PENCIL ? styles.active : ""}`} onClick={()=>handleMenu(MENU_ITEMS.PENCIL)}>
            <FontAwesomeIcon icon={faPencil} className={styles.icon} />
            </div>
            <div className={`${styles.iconWrapper} ${activeMenuItem===MENU_ITEMS.ERASER ? styles.active : ""}`} onClick={()=>handleMenu(MENU_ITEMS.ERASER)}>
            <FontAwesomeIcon icon={faEraser} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper} onClick={()=>handleMenu(activeMenuItem)}>
            <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper} onClick={()=>handleMenu(activeMenuItem)}>
            <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
            </div>
            <div className={styles.iconWrapper} onClick={()=>handleMenu(activeMenuItem)}>
            <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
            </div>
        </div>
    )
}
export default Menu;