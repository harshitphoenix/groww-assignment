import styles from "@/styles/AboutMeta.module.css";

type AboutMetaProps = {
  label?: string;
  value?: string;
};

const AboutMeta = ({ label, value }: AboutMetaProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>
      <p>{value}</p>
    </div>
  );
};

export default AboutMeta;
