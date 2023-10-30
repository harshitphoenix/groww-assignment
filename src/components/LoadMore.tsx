import styles from "@/styles/LoadMoreButton.module.css";
import { FaAngleDoubleDown, FaAngleDown } from "react-icons/fa";
type LoadMoreButtonProps = {
  onClick: () => void;
};
const LoadMoreButton = ({ onClick }: LoadMoreButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick} className={styles.btn}>
        Load More
      </button>
      <FaAngleDoubleDown size={30} />
    </div>
  );
};

export default LoadMoreButton;
