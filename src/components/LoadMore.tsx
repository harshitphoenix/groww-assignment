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
    <div onClick={handleClick} className={styles.container}>
      <p className={styles.btn}>Load More</p>
      <FaAngleDoubleDown size={20} />
    </div>
  );
};

export default LoadMoreButton;
