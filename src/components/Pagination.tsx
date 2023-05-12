import { Button } from "./Button"
import styles from "./Pagination.module.css"

type Props = {
    onNext: () => void
    onPrevious: () => void
}

export const Pagination: React.FC<Props> = ({ onPrevious, onNext }) => (<div>
    <Button title="Previous" onClick={onPrevious} className={styles.previousBtn}/>
    <Button title="Next" onClick={onNext} className={styles.nextBtn}/>
</div>)