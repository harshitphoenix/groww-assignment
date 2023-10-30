import Link from "next/link";
import styles from "@/styles/AboutTags.module.css";
type AboutTagsProps = {
  lable: string;
  tags: string;
};
const AboutTags = ({ lable, tags }: AboutTagsProps) => {
  return (
    <div className={styles.container}>
      {/* {tags.map((tag) => (
        <Link
          key={tag}
          //   to={`/tags/${slugif(tag)}`}
          className="mr-3 mb-2 text-sm text-gray-700 hover:text-gray-900"
        >
          #{tag}
        </Link>
      ))} */}
      <span className={styles.label}>{lable}: </span>
      <span className={styles.tags}>{tags}</span>
    </div>
  );
};

export default AboutTags;
