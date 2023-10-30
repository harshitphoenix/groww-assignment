import styles from "@/styles/TabSwitch.module.css";

type TabSwitchProps = {
  tabs: string[];
  activeTab?: string;
  onSwitch?: (val: string) => void;
};

const TabSwitch = ({ tabs, onSwitch, activeTab }: TabSwitchProps) => {
  return (
    <div className={styles.container}>
      {tabs.length > 0 &&
        tabs.map((val, index) => (
          <button
            className={activeTab === val ? styles.activeTab : styles.tabs}
            key={`${index}-${val}`}
            onClick={() => onSwitch && onSwitch(val)}
          >
            {val}
          </button>
        ))}
    </div>
  );
};

export default TabSwitch;
