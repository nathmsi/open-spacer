


import { useState } from "react";
import DaySelector from "../HomePage/DaySelector";
import MapPlace from "../HomePage/MapPlace";

import styles from "./index.module.scss";

const PlacePage = () => {
  const [daySelected, setDaySelected] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.title}>Open Spacer</div>
      <DaySelector handleSelectDay={(day) => setDaySelected(day)} />
      <div className={styles.Mapcontainer}>
        <MapPlace daySelected={daySelected} />
      </div>
    </div>
  );
};

export default PlacePage;
