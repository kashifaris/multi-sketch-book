import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown, } from '@fortawesome/free-solid-svg-icons'

import styles from './index.module.css'
function Menu() {
    return ( <div className={styles.menuContainer}>
        <div >
        <FontAwesomeIcon icon={faPencil} className={styles.iconWrapper}/>
        </div>
        <div>
        <FontAwesomeIcon icon={faEraser} className={styles.iconWrapper}/>
        </div>
        <div>
        <FontAwesomeIcon icon={faRotateLeft} className={styles.iconWrapper}/>
        </div>
        <div>
        <FontAwesomeIcon icon={faRotateRight} className={styles.iconWrapper}/>
        </div>
        <div>
        <FontAwesomeIcon icon={faFileArrowDown} className={styles.iconWrapper}/>
        </div>

    </div> );
}

export default Menu;