
import AddPlace from './Place';
import ListEmploye from './ListEmploye';

import CustomAccordion from '../commons/Accordion';

import styles from "./index.module.scss";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}> 
        Open Spacer
      </div>

      <CustomAccordion title="Place" content={<AddPlace />} />
      <CustomAccordion title="Employee" content={<ListEmploye />} />
    </div>
  );
};


export default HomePage;