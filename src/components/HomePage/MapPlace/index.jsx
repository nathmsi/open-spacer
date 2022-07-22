import { useEffect, useState } from "react";
import { getDatabase, ref, remove, onValue } from "firebase/database";
import { deepOrange, deepPurple } from "@mui/material/colors";

import styles from "./index.module.scss";

import { db } from "../../../utils/firebase";

import { stringAvatar } from "../../../utils/colors";

import MapPlace from '../../MapPlace';

const HomePage = ({ daySelected }) => {
  const [places, setPlaces] = useState([]);
  const [assignedPlace, setAssignedPlace] = useState([]);

  useEffect(() => {
    onValue(ref(db, `places`), (snapshot) => {
      const data = snapshot.val();
      const places =
        data &&
        Object.keys(data).map((key) => ({
          ...data[key],
        }));
      setPlaces(places);
    });
  }, []);

  useEffect(() => {
    setAssignedPlace([]);
    if (daySelected) {
      onValue(ref(db, `week/${daySelected}`), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const employeesAssigned =
            data.employees &&
            Object.keys(data.employees).map((key) => ({
              ...data.employees[key],
            }));
          const employeesWithPlace = employeesAssigned?.filter(
            (el) => el.place
          );
          setAssignedPlace(employeesWithPlace);
        }
      });
    }
  }, [daySelected]);

  const handleRemovePlaceEmployee = async (employee) => {
    await remove(ref(db, `week/${daySelected}/employees/${employee.id}`));
  };

  return (
    <div>
      <MapPlace {...({ handleRemovePlaceEmployee, places, assignedPlace })} />
    </div>
  );
};

export default HomePage;
