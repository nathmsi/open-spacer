import { useState } from "react";
import AddPlace from "../HomePage/Place";
import ListEmploye from "../HomePage/ListEmploye";

import CustomAccordion from "../commons/Accordion";
import DaySelector from "../HomePage/DaySelector";
import MapPlace from "../HomePage/MapPlace";
import NotAssignedEmployee from "../HomePage/NotAssignedEmployee";
import RemoteEmployee from "../HomePage/RemoteEmployee";

import EditMapPage from '../HomePage'


import styles from "./index.module.scss";

const EditComponent = () => {
  const [daySelected, setDaySelected] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.title}>Open Spacer</div>
      <CustomAccordion title="Place" content={<AddPlace />} />
      <CustomAccordion title="Employee" content={<ListEmploye />} />
      <EditMapPage />
    </div>
  );
};

export default EditComponent;
