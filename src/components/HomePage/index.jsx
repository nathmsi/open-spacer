import { useState } from "react";
import AddPlace from "./Place";
import ListEmploye from "./ListEmploye";

import CustomAccordion from "../commons/Accordion";
import DaySelector from "./DaySelector";
import MapPlace from "./MapPlace";
import NotAssignedEmployee from "./NotAssignedEmployee";
import RemoteEmployee from "./RemoteEmployee";
import OffEmployee from "./DayOffEmployee";

import styles from "./index.module.scss";

const HomePage = () => {
  const [daySelected, setDaySelected] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.title}>Open Spacer</div>
        <div className={styles.employeeAssign}>
          <NotAssignedEmployee daySelected={daySelected} />
          <RemoteEmployee daySelected={daySelected} />
          <OffEmployee daySelected={daySelected} />
        </div>
      <DaySelector handleSelectDay={(day) => setDaySelected(day)} />
      <div className={styles.Mapcontainer}>
        <MapPlace daySelected={daySelected} />
      </div>
    </div>
  );
};

export default HomePage;
