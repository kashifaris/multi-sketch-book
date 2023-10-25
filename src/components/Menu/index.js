import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown, } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'
import styles from './index.module.css'
import { useDispatch,useSelector } from 'react-redux';
import { actionItemClick, menuItemClick } from '@/slice/menuSlice';
import { MENU_ITEMS } from '@/constants';
function Menu() {
    const dispatch= useDispatch();
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);

    const handleMenuClick=(itemName)=>{
            dispatch(menuItemClick(itemName));
    }

    const handleActionItemClick=(itemName)=>{
        dispatch(actionItemClick(itemName));
    }

    return ( <div className={styles.menuContainer}>
        <div className={cx(styles.iconWrapper,{[styles.active]:activeMenuItem=== MENU_ITEMS.PENCIL})}  onClick={()=>handleMenuClick(MENU_ITEMS.PENCIL)}>
        <FontAwesomeIcon icon={faPencil} className={styles.icon}/>
        </div>
        <div className={cx(styles.iconWrapper,{[styles.active]:activeMenuItem=== MENU_ITEMS.ERASER})} onClick={()=>handleMenuClick(MENU_ITEMS.ERASER)} >
        <FontAwesomeIcon icon={faEraser} className={styles.icon} />
        </div>
        <div className={styles.iconWrapper} >
        <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} onClick={()=> handleActionItemClick(MENU_ITEMS.UNDO)}/>
        </div>
        <div className={styles.iconWrapper} >
        <FontAwesomeIcon icon={faRotateRight} className={styles.icon} onClick={()=> handleActionItemClick(MENU_ITEMS.REDO)}/>
        </div>
        <div className={styles.iconWrapper} >
        <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} onClick={()=> handleActionItemClick(MENU_ITEMS.DOWNLOAD)}/>
        </div>

    </div> );
}

export default Menu;