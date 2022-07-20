import { useState } from "react";
import AddPlace from "./Place";
import ListEmploye from "./ListEmploye";

import CustomAccordion from "../commons/Accordion";
import DaySelector from "./DaySelector";
import MapPlace from "./MapPlace";
import NotAssignedEmployee from "./NotAssignedEmployee";
import RemoteEmployee from "./RemoteEmployee";


import styles from "./index.module.scss";

const HomePage = () => {
  const [daySelected, setDaySelected] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.title}>Open Spacer</div>
      {/* <CustomAccordion title="Place" content={<AddPlace />} />
      <CustomAccordion title="Employee" content={<ListEmploye />} /> */}
      <DaySelector handleSelectDay={(day) => setDaySelected(day)} />
      <div className={styles.Mapcontainer}>
        <RemoteEmployee daySelected={daySelected} />
        <MapPlace daySelected={daySelected} />
        <NotAssignedEmployee daySelected={daySelected}/>
      </div>
    </div>
  );
};

export default HomePage;
