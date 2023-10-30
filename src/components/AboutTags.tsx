import Link from "next/link";
import styles from "@/styles/AboutTags.module.css";
type AboutTagsProps = {
  lable: string;
  tags: string;
};
const AboutTags = ({ lable, tags }: AboutTagsProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{lable}: </span>
      <span className={styles.tags}>{tags}</span>
    </div>
  );
};

export default AboutTags;
