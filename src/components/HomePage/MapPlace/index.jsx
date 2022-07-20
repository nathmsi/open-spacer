import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { getDatabase, ref, remove, onValue } from "firebase/database";
import { deepOrange, deepPurple } from "@mui/material/colors";

import styles from "./index.module.scss";

import { db } from "../../../utils/firebase";

import { stringAvatar } from "../../../utils/colors";

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
      <div className={styles.container}>
        {places?.map(({ numberPlace }) => {
          const employeeAssigned = assignedPlace.find(
            (el) => el.place === numberPlace
          );
          return (
            <ListItem alignItems="flex-start" key={numberPlace}>
              <ListItemAvatar
                sx={{ cursor: "pointer" }}
                onClick={() =>
                  employeeAssigned &&
                  handleRemovePlaceEmployee(employeeAssigned)
                }
              >
                <Avatar
                  {...stringAvatar(
                    employeeAssigned ? employeeAssigned.name : numberPlace
                  )}
                />
              </ListItemAvatar>
            </ListItem>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
