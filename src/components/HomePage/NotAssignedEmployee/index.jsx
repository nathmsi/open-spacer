import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ref, onValue, set, get } from "firebase/database";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import IconButton from "@mui/material/IconButton";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import styles from "./index.module.scss";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { db } from "../../../utils/firebase";
import { stringAvatar } from "../../../utils/colors";

const NotAssignedEmployee = ({ daySelected }) => {
  // const [employes, setEmployes] = useState([]);
  const [unasignedEmployee, setUnasignedEmployee] = useState([]);

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    onValue(ref(db, `places`), (snapshot) => {
      const data = snapshot.val();
      const places =
        data &&
        Object.keys(data).map((key) => key);
      setPlaces(places);
    });
  }, []);

  useEffect(() => {
    if (daySelected) {
      onValue(ref(db, `week/${daySelected}`), async (snapshot) => {
        const data = snapshot.val();
        const employesSnapshot = await get(ref(db, `employees`));
        const employesGlobal = employesSnapshot.val();
        if (employesGlobal) {
          const employes =
            employesGlobal &&
            Object.keys(employesGlobal).map((key) => ({
              ...employesGlobal[key],
            }));
          const assignedEmployee = data?.employees || [];
          const unasignedEmployee = employes.filter(
            (el) => !assignedEmployee[el.id]
          );
          if (assignedEmployee?.length === 0) {
            setUnasignedEmployee(employes);
          } else {
            setUnasignedEmployee(unasignedEmployee);
          }
        }
      });
    }
  }, [daySelected]);

  const handleRemoteEmployee = async (employee) => {
    await set(ref(db, `week/${daySelected}/employees/${employee.id}`), {
      ...employee,
      remote: true,
    });
  };

  const handleChangePlace = async (employee) => {
    await set(ref(db, `week/${daySelected}/employees/${employee.id}`), {
      ...employee,
    });
  };


  return (
    <div>
      <div className={styles.title}>Unassigned Employee</div>
      <div className={styles.container}>
        {unasignedEmployee?.map(({ name, id }) => (
          <ListItem
            alignItems="flex-start"
            key={id}
            secondaryAction={
              <div className={styles.actions} >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Place</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    onChange={(e) => handleChangePlace({ name, id, place: e.target.value })}
                  >
                    {places?.map((place) => <MenuItem key={place} value={place}>{place}</MenuItem>)}
                  </Select>
                </FormControl>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoteEmployee({ name, id })}
                >
                  <HomeOutlinedIcon />
                </IconButton>
              </div>
            }
          >
            <ListItemAvatar>
              <Avatar {...stringAvatar(name)} />
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  id : {id}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default NotAssignedEmployee;
